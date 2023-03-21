import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CodeCard from './CodeCard'
import axios from 'axios'

const UserCodes = () => {
  const history = useNavigate()
  const [codes, setCodes] = useState([])

  const deleteCode = async (id) => {
    setCodes((codes) => codes.filter((code) => code._id !== id))

    const resp = await axios.delete(`https://pro-code-tawan.vercel.app/api/snippet/delete/${id}`, {
      headers: {
        "auth-token": localStorage.token
      }
    })
  }

  const getCodesOfUser = async () => {
    try {
      const resp = await axios.get('https://pro-code-tawan.vercel.app/api/snippet/getByUser', {
        headers: {
          'auth-token': localStorage.token
        }
      })

      setCodes(resp.data)
    }
    catch (error) {
      history('/')
    }
  }

  useEffect(() => {
    getCodesOfUser()
  }, [])


  return (
    <div className='flex flex-col p-5 space-y-5'>
      <Link to='/landing' className='text-center border-2 border-black z-10 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0)] px-4 py-2 flex-shrink-0 bg-yellow-500 text-black hover:shadow transition duration-150 text-xl w-fit'>Back</Link>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-2'>
        {codes.map((code) => <CodeCard key={code._id} title={code.title} code={code.code} date={code.date} id={code._id} children={<div className="flex justify-evenly">
          <Link to="/landing" state={{
            id: code._id,
            title: code.title,
            code: code.code
          }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Edit
          </Link>
          <button type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => deleteCode(code._id)}>
            Delete
          </button>
        </div>} />)}
      </div>
    </div>
  )
}

export default UserCodes