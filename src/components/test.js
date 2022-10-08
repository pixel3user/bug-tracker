import React from 'react'
import { Link } from 'react-router-dom'

export default function Test() {
  return (
    <div>
        <aside className='hidden lg:block fixed z-20 w-[10rem] left-[max(0px,calc(50%-45rem))] top-[3rem] h-screen overflow-y-auto border-r-[1.5px] border-borderBlack dark:bg-black dark:border-gray-400'>
          <div className='float-right w-full flex flex-col mt-5 pl-3'>
            <Link to={'/home'} className={`flex flex-row mb-2 rounded-l-lg dark:text-white  dark:bg-gray-600`}>
              <h1 className=' p-2 text-md'>Home</h1>
            </Link>
            <Link to={'/my-projects'} className={`flex flex-row mb-2 rounded-l-lg dark:text-white dark:bg-gray-600 `}>
              <h1 className=' p-2 text-md'>Projects</h1>
            </Link>
            <Link to={'/create-project'} className={`flex flex-row mb-2 rounded-l-lg dark:text-white dark:bg-gray-600 `}>
              <h1 className=' p-2 text-md'>Create Project</h1>
            </Link>
          </div>
          <div></div>
        </aside>
    </div>
  )
}
