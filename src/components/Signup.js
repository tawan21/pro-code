import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [details, setDetails] = useState({ name: "", email: "", password: "" })
  const history = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const resp = await axios.post("https://pro-code.vercel.app/api/auth/register", JSON.stringify({ name: details.name, email: details.email, password: details.password }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    localStorage.token = resp.data.authtoken

    if (resp.data.success)
      history("/landing")
  }

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="First Name" value={details.name} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email Address" value={details.email} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" value={details.password} onChange={handleChange} />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Register
            </button>
            <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Sign In instead
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup