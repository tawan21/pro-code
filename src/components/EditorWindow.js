import React, { useState } from 'react'
import Editor from '@monaco-editor/react'

const EditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || '')

  const handleChange = (value) => {
    setValue(value)
    onChange('code', value)
  }

  return (
    <div className='overlay rounded-md overflow-hidden w-full h-full shadow-4xl'>
      <Editor
        height='85vh'
        width={`100%`}
        language={language}
        value={value}
        theme={theme}
        defaultValue='// some comment'
        onChange={handleChange}
      />
    </div>
  )
}

export default EditorWindow