import React from 'react'

const Navbar = () => {
  return (
    <nav className="z-50 bg-gradient-to-l from-pink-500 dark:from-pink-700 via-red-500 dark:via-red-700 to-yellow-500 dark:to-yellow-700 px-2 sm:px-4 py-2.5 sticky top-0 dark:text-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto p-2">
        <span className="self-center text-xl md:text-2xl font-bold whitespace-nowrap dark:text-white">Pro-Code</span>
      </div>
    </nav>

  )
}

export default Navbar