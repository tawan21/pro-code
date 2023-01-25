import React, { useState } from 'react'
import EditorWindow from './EditorWindow'
import { langOptions } from '../constants/langOptions';
import LangDropdown from './LangDropdown';
import ThemeDropdown from './ThemeDropdown';

const pyDefault = '# some comment'

const Landing = () => {
  const [code, setCode] = useState(pyDefault);
  const [language, setLanguage] = useState(langOptions[0]);
  const [theme, setTheme] = useState('cobalt');

  const onSelectChange = (sl) => {
    setLanguage(sl)
  }

  const handleThemeChange = () => {
    
  }

  const onChange = (action, data) => {
    switch (action) {
      case 'code': {
        setCode(data)
        break
      }
      default: {
        console.warn("case not handled!", action, data)
      }
    }
  }

  return (
    <>
      <div className='h-2 w-full bg-gradient-to-l from-pink-500 via-red-500 to-yellow-500'></div>
      <div className='flex flex-row'>
        <div className="px-4 py-2">
          <LangDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <EditorWindow
        code={code}
        onChange={onChange}
        language={language?.value}
        theme={theme}
      />
    </>
  )
}

export default Landing