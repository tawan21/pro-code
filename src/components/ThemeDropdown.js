import React from 'react'
import Select from 'react-select'
import monacoThemes from 'monaco-themes/themes/themelist.json'
import { customStyles } from '../constants/customStyles'

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  return (
    <Select
      placeholder={`Select Theme`}
      options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId, 
        key: themeId
      }))}
      styles={customStyles}
      value={theme}
      onChange={handleThemeChange}
    />
  )
}

export default ThemeDropdown