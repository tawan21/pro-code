import React from 'react'

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <textarea
      rows={5}
      res
      value={customInput}
      onChange={(e) => setCustomInput(e.target.value)}
      placeholder={'Custom Input'}
      className='focus:outline-none w-full resize-none border-2 border-black z-10 rounded-md shadow-md px-4 py-2 hover:shadow-lg transition duration-150 bg-white mt-2'
    >

    </textarea>
  )
}

export default CustomInput