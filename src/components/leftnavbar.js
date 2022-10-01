import React from 'react'
import { Link } from 'react-router-dom'

export default function LeftNavBar({page}) {

  return (
    // <aside className='w-2/12 mt-12 left-0 top-0 h-screen border-r-[1.5px] dark:bg-black dark:border-gray-400'>
    //       <div className='float-right w-full flex flex-col mt-5'>
    //         <Link to={'/home'} className={`flex flex-row mb-2 rounded-l-lg dark:text-white  dark:bg-gray-600 ${page === "/home" && "bg-gray-200 dark:bg-gray-200 dark:text-black border-r-[3px] border-green-500"}`}>
    //           <h1 className=' p-2 text-md'>Home</h1>
    //         </Link>
    //         <Link to={'/my-projects'} className={`flex flex-row mb-2 rounded-l-lg dark:text-white dark:bg-gray-600 ${page === "/my-projects" && "bg-gray-200 dark:bg-gray-200 dark:text-black border-r-[3px] border-green-500"}`}>
    //           <h1 className=' p-2 text-md'>My Project</h1>
    //         </Link>
    //         <Link to={'/create-project'} className={`flex flex-row mb-2 rounded-l-lg dark:text-white dark:bg-gray-600 ${page === "/create-project" && "bg-gray-200 dark:bg-gray-200 dark:text-black border-r-[3px] border-green-500"}`}>
    //           <h1 className=' p-2 text-md'>Create Project</h1>
    //         </Link>
    //       </div>
    //       <div></div>
    //     </aside>

    <aside className='hidden lg:block fixed z-20 w-[10rem] left-[max(0px,calc(50%-45rem))] top-[3rem] h-screen overflow-y-auto border-r-[1.5px] border-borderBlack dark:bg-black dark:border-gray-400'>
          <div className='float-right w-full flex flex-col mt-5 pl-3'>
            <Link to={'/home'} className={`flex flex-row mb-2 rounded-l-lg dark:text-white  dark:bg-gray-600 ${page === "/home" && "bg-navBar dark:bg-navBar dark:text-black border-r-[3px] border-navBarBorder"}`}>
              <h1 className=' p-2 text-md'>Home</h1>
            </Link>
            <Link to={'/my-projects'} className={`flex flex-row mb-2 rounded-l-lg dark:text-white dark:bg-gray-600 ${page === "/my-projects" && "bg-navBar dark:bg-navBar dark:text-black border-r-[3px] border-navBarBorder"}`}>
              <h1 className=' p-2 text-md'>Projects</h1>
            </Link>
            <Link to={'/create-project'} className={`flex flex-row mb-2 rounded-l-lg dark:text-white dark:bg-gray-600 ${page === "/create-project" && "bg-navBar dark:bg-navBar dark:text-black border-r-[3px] border-navBarBorder"}`}>
              <h1 className=' p-2 text-md'>Create Project</h1>
            </Link>
          </div>
          <div></div>
        </aside>
  )
}
