import { join } from 'path'
import { homedir } from 'os'
import { readdirSync, symlinkSync } from 'fs'

const HOME_LOC = '.splendid'

const findPotrace = async (spawn, locations) => {
  const f = await locations.reduce(async (found, current) => {
    found = await found
    if (found) return found
    const res = await spawn(current, ['-v'], { quiet: true })
    if (!res) return null
    return current
  }, null)
  return f
}

const getBinPath = (dir) => {
  switch (process.platform) {
  case 'linux':
  case 'darwin':
    return join(dir, 'potrace')
  case 'win32':
    return join(dir, 'potrace.exe')
  }
}

export default async function installPotrace({ spawn, askSingle, warn, saveArchive,
  updateFiles, loading }) {
  const HOME_POTRACE = join(homedir(), HOME_LOC)
  const HOME_BIN = getBinPath(HOME_POTRACE)
  const potrace = await findPotrace(spawn, ['potrace', HOME_BIN])
  const setConfig = async (p) => {
    await updateFiles({ re: /potracePath: '.+?'/,
      replacement: `potracePath: '${p.replace(homedir(), '~')}'`,
    }, { file: 'splendid/index.js' })
  }
  if (potrace) {
    if (potrace == 'potrace') console.log('Found potrace globally')
    else console.log('Found potrace in %s', potrace)
    await setConfig(potrace)
    return
  }
  console.log('To generate potrace effect on images, Splendid needs potrace binary')
  console.log('which was not found on your system. It can now be downloaded (~200KB)')
  console.log('and installed in the project or user home ~/.splendid dir automatically.')
  const answer = await askSingle({
    text: 'Download potrace now? [project|local|n]',
    getDefault() { return 'local' },
  })
  let installPath
  if (answer == 'project') {
    installPath = join(__dirname, '../potrace')
  } else if (answer == 'local') {
    installPath = HOME_POTRACE
  }
  if (!installPath) {
    console.log('You can add the path to potrace in config later.')
    await updateFiles({
      re: /potracePath/,
      replacement: '// potracePath',
    }, { file: 'splendid/index.js' })
    return
  }
  const platform = links[process.platform]
  if (!platform) warn('Platform %s is not supported', process.platform)
  const link = platform[process.arch]
  if (!link) warn('Architecture %s is not supported', process.arch)
  console.log('potrace binary found at: %s', link)
  const res = await loading('Downloading potrace', saveArchive(link, installPath))
  if (res) {
    const [r] = readdirSync(res)
    const path = join(installPath, r)
    const bin = getBinPath(path)
    symlinkSync(bin, HOME_BIN)
    await setConfig(HOME_BIN)
  }
}

// http://potrace.sourceforge.net/#downloading
const links = {
  win32: {
    'ia32': 'http://potrace.sourceforge.net/download/1.16/potrace-1.16.win32.zip',
    'x64': 'http://potrace.sourceforge.net/download/1.16/potrace-1.16.win64.zip',
  },
  darwin: {
    'x64': 'http://potrace.sourceforge.net/download/1.16/potrace-1.16.mac-x86_64.tar.gz',
    'x32': 'http://potrace.sourceforge.net/download/1.16/potrace-1.16.mac-i386.tar.gz',
  },
  linux: {
    'x64': 'http://potrace.sourceforge.net/download/1.16/potrace-1.16.linux-x86_64.tar.gz',
    'x32': 'http://potrace.sourceforge.net/download/1.16/potrace-1.16.linux-i386.tar.gz',
  },
}