export default {
  text: 'Keep help',
  confirm: true,
  async afterQuestions({ updateFiles, removeFiles, rm }, keep) {
    if (keep) await updateFiles([
      {
        re: /<!-- help: /gm,
        replacement() {
          this.debug('Updating help in %s', this.path)
          return '<!-- '
        },
      },
    ], { extensions: ['html', 'md'] })
    else {
      await updateFiles([
        {
          re: /^ *<!-- help: [\s\S]+? -->\r?\n/gm,
          replacement() {
            this.debug('Removing help from %s', this.path)
            return ''
          },
        },
      ], { extensions: ['html', 'md'] })
      await updateFiles([
        {
          re: /\n\/\/ start help[\s\S]+?\/\/ end help(\r?\n)?/gm,
          replacement() { return '' },
        },
      ], { file: 'pages/index.js' })
      await updateFiles([
        {
          re: /, '..\/help\/.+?'/gm,
          replacement() { return '' },
        },
      ], { file: 'splendid/index.js' })
      removeFiles(/splendid\/.*?\/README\.md$/)
      removeFiles(/pages\/README\.md$/)
      await rm('splendid/comps/help')
      await rm('help')
    }
  },
}