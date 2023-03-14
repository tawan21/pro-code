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
import { Link } from 'react-router-dom'

const pyDefault = 'print("Welcome to Pro-Code!")'

const Landing = () => {
  const [user, setUser] = useState("")
  const [code, setCode] = useState(pyDefault)
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

  const handleCompile = async () => {
    setProcessing(true)

    const formData = {
      language_id: language.id,
      source_code: Buffer.from(code).toString('base64'),
      stdin: Buffer.from(customInput).toString('base64')
    }

    console.log(formData)

    try {
      const response = await axios.post(process.env.REACT_APP_RAPID_API_URL, formData, {
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
        },
        params: {
          base64_encoded: 'true',
          fields: '*'
        }
      })

      console.log(response.data)
      addCode()

      const token = response.data.token
      checkStatus(token)

    } catch (error) {
      console.log(error)
    }
  }

  const checkStatus = async (token) => {
    try {
      const response = await axios.get(process.env.REACT_APP_RAPID_API_URL + '/' + token, {
        headers: {
          'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
        },
        params: {
          base64_encoded: 'true',
          fields: '*'
        }
      })

      const statusId = response.data.status?.id

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      }

      setProcessing(false)
      setOutputDetails(response.data)
      console.log(response.data)
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
    const resp = await axios.post("http://localhost:5000/api/auth/getUser", {}, {
      headers: {
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwOWNhYTNiNDJkODI2ZWUzZDU2YmUzIn0sImlhdCI6MTY3ODcwNzUwMX0.OWv47xMSn31oBemRxQcoNYICYgJARNIfUmsRCVQBstk'
      }
    })
    setUser(resp.data.email)
  }

  const addCode = async () => {
    const resp = await axios.post("http://localhost:5000/api/snippet/add", {
      code: code
    }, {
      headers: {
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwOWNhYTNiNDJkODI2ZWUzZDU2YmUzIn0sImlhdCI6MTY3ODcwNzUwMX0.OWv47xMSn31oBemRxQcoNYICYgJARNIfUmsRCVQBstk'
      }
    })
  }

  useEffect(() => {
    handleThemeChange({ value: 'light', label: 'Light (default)' })
    getUser()
  }, [])

  return (
    <>
      <div className='h-2 w-full bg-gradient-to-l from-pink-500 via-red-500 to-yellow-500'></div>
      <div className='flex flex-row justify-around'>
        <div className="px-4 py-2">
          <LangDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
        <div className="flex items-center space-x-2">
          <span>
            Signed in with {user}
          </span>
          <button className='border-2 border-black z-10 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0)] px-4 py-2 flex-shrink-0 bg-red-600 text-white hover:shadow transition duration-150 text-sm'>Logout</button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 items-start px-4 py-4 gap-4'>
        <div className='col-span-1 md:col-span-2'>
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
              {processing ? "Processing..." : "Run Code"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
    </>
  )
}

export default Landing