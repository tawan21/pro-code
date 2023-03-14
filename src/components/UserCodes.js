import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CodeCard from './CodeCard'
import axios from 'axios'

const UserCodes = () => {
  const [codes, setCodes] = useState([])

  const getCodesOfUser = async () => {
    const resp = await axios.get('http://localhost:5000/api/snippet/getByUser', {
      headers: {
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwOWNhYTNiNDJkODI2ZWUzZDU2YmUzIn0sImlhdCI6MTY3ODc5MjczNn0.u4cmnvJkxAbePdPBpihRC1dgozn60bZa8Fycsgqq9AM'
      }
    })

    setCodes(resp.data)
  }

  useEffect(() => {
    getCodesOfUser()
  }, [])


  return (
    <div className='flex flex-col space-y-5'>
      <Link to='/landing' className='text-center border-2 border-black z-10 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0)] px-4 py-2 flex-shrink-0 bg-yellow-500 text-black hover:shadow transition duration-150 text-xl'>Back</Link>
      <div className='grid grid-cols-3 md:grid-cols-5 gap-2'>
        {codes.map((code) => <CodeCard code={code.code} date={code.date} />)}
      </div>
    </div>
  )
}

export default UserCodes