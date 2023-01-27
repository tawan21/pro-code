import { loader } from '@monaco-editor/react'
import monacoThemes from 'monaco-themes/themes/themelist.json'

const defineTheme = (theme) => {
  return new Promise((res) => {
    Promise.all([
      loader.init(),
      import(`monaco-themes/themes/${monacoThemes[theme]}.json`)
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData)
      res()
    })
  })
}

export { defineTheme }