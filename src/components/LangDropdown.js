import React from 'react'
import Select from 'react-select'
import { langOptions } from '../constants/langOptions'
import { customStyles } from '../constants/customStyles'

const LangDropdown = ({ onSelectChange }) => {
  return (
    <Select
      placeholder={`Filter by Category`}
      options={langOptions}
      styles={customStyles}
      defaultValue={langOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  )
}

export default LangDropdown