import React from 'react'
import Select from 'react-select'
import monacoThemes from 'monaco-themes/themes/themelist.json'
import { customStyles } from '../constants/customStyles'

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  const options = Object.entries(monacoThemes).map(([themeId, themeName]) => ({
    label: themeName,
    value: themeId,
    key: themeId
  }))

  options.splice(0, 0, {label: 'Light (default)', value: 'light', key: 'light'})
  options.splice(1, 0, {label: 'Dark', value: 'vs-dark', key: 'vs-dark'})

  return (
    <Select
      placeholder={`Select Theme`}
      options={options}
      styles={customStyles}
      value={theme}
      onChange={handleThemeChange}
    />
  )
}

export default ThemeDropdown