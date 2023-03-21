import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const CodeCard = (props) => {
  const truncate = (input) => input.length > 75 ? `${input.substring(0, 75)}...` : input

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-4 font-serif text-4xl tracking-wider text-ellipsis overflow-hidden font-bold text-gray-900 dark:text-white">{truncate(props.title)}</h5>
      <h5 className="mb-2 text-lg text-ellipsis overflow-hidden font-mono text-gray-900 dark:text-white">{truncate(props.code)}</h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{new Date(props.date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      })}</p>
      {props.children}
    </div>
  )
}

export default CodeCard