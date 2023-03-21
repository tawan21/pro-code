import React, { useEffect, useState } from 'react'
import EditorWindow from './EditorWindow'
import { langOptions } from '../constants/langOptions'
import LangDropdown from './LangDropdown'
import ThemeDropdown from './ThemeDropdown'
import axios from 'axios'
import { Buffer } from 'buffer'
import OutputDetails from './OutputDetails'
import OutputWindow from './OutputWindow'
import { defineTheme } from '../lib/defineTheme'
import CustomInput from './CustomInput'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const pyDefault = 'print("Welcome to Pro-Code!")'

const Landing = () => {
  const history = useNavigate()
  const location = useLocation()
  const propsData = location.state
  const [user, setUser] = useState("")
  const [title, setTitle] = useState(propsData ? propsData.title : "")
  const [code, setCode] = useState(propsData ? propsData.code : pyDefault)
  const [language, setLanguage] = useState(langOptions[0])
  const [theme, setTheme] = useState('light')
  const [processing, setProcessing] = useState(null)
  const [customInput, setCustomInput] = useState("")
  const [outputDetails, setOutputDetails] = useState(null);

  const onSelectChange = (sl) => {
    setLanguage(sl)
  }

  const handleThemeChange = (th) => {
    if (['light', 'vs-dark'].includes(th.value)) setTheme(th)
    else defineTheme(th.value).then((_) => setTheme(th))
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleCompile = async () => {
    setProcessing(true)

    const formData = {
      language_id: language.id,
      source_code: Buffer.from(code).toString('base64'),
      stdin: Buffer.from(customInput).toString('base64')
    }

    try {
      const response = await axios.post("https://pro-code.vercel.app/api/snippet/submit", formData)

      if (propsData)
        updateCode(propsData.id)
      else
        addCode()

      const token = response.data.token
      checkStatus(token)

    } catch (error) {
      console.log(error)
    }
  }

  const checkStatus = async (token) => {
    try {
      const response = await axios.get(`https://pro-code.vercel.app/api/snippet/status/${token}`)

      const statusId = response.data.id

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      }

      setProcessing(false)
      setOutputDetails(response.data)
    } catch (error) {
      console.log(error)
      setProcessing(false)
    }
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

  const getUser = async () => {
    try {
      const resp = await axios.post("https://pro-code.vercel.app/api/auth/getUser", {}, {
        headers: {
          'auth-token': localStorage.token
        }
      })
      setUser(resp.data.email)
    }
    catch (error) {
      history('/')
    }
  }

  const addCode = async () => {
    const resp = await axios.post("https://pro-code.vercel.app/api/snippet/add", {
      title: title,
      code: code
    }, {
      headers: {
        'auth-token': localStorage.token
      }
    })
  }

  const updateCode = async (id) => {
    const resp = await axios.put(`https://pro-code.vercel.app/api/snippet/update/${id}`, {
      title: title,
      code: code
    }, {
      headers: {
        'auth-token': localStorage.token
      }
    })
  }

  useEffect(() => {
    handleThemeChange({ value: 'light', label: 'Light (default)' })
    getUser()
  }, [])

  return (
    <>
      <div className='flex flex-row justify-around px-2 md:px-0'>
        <div className="px-4 py-2">
          <LangDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm md:text-base">
            Signed in with {user}
          </span>
          <button className='border-2 border-black z-10 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0)] px-4 py-2 flex-shrink-0 bg-red-600 text-white hover:shadow transition duration-150 text-xs md:text-sm' onClick={() => { localStorage.removeItem("token"); getUser() }}>Logout</button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 items-start px-4 py-4 gap-4'>
        <div className='col-span-1 md:col-span-2'>
          <input type="text" placeholder="Title" className='focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-md px-4 py-2 hover:shadow-lg transition duration-150 bg-white mb-6' onChange={handleChange} value={title} />
          <EditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>
        <div className='col-span-1 right-container flex flex-shrink-0 flex-col space-y-2'>
          <Link to='/snippets' className='text-center border-2 border-black z-10 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0)] px-4 py-2 flex-shrink-0 bg-blue-700 text-white hover:shadow transition duration-150'>My Code Snippets</Link>
          <OutputWindow outputDetails={outputDetails} />
          <div className='flex flex-col items-end my-5'>
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code || processing}
              className={`mt-4 border-2 border-black z-10 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0)] px-4 py-2 flex-shrink-0 bg-green-700 text-white ${!code || processing ? 'opacity-50' : 'hover:shadow transition duration-150'}`}
            >
              {processing ? "Processing..." : "Save & Run Code"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
    </>
  )
}

export default Landing