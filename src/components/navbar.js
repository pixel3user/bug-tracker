import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { getDocs, query, where } from 'firebase/firestore'
import { database } from '../firebase'

export default function NavBar() {                          // i really never have to change this shitty navbar so , lets just save time here. bye

    const [menuItems, setmenuItems] = useState('hidden')
    const { currentuser, logout } = useAuth()
    const [searchValue,setsearchValue] = useState('')
    const [searchBar,setsearchBar] = useState('hidden')
    const [searchResultUser, setsearchResultUser] = useState([])
    const [searchResultProject, setsearchResultProject] = useState([])

    function menuVisibility(e){
        e.preventDefault()
        menuItems == 'hidden' ? setmenuItems('') : setmenuItems('hidden')
    }

    function submitlogouthandler(e){
        e.preventDefault()

        try{
            logout()
        }catch{
            console.log("Error bc")
        }
      }

      function searchState(e){
        e.preventDefault()
        searchBar == 'hidden' ? setsearchBar('') : setsearchBar('hidden')
      }

      useEffect(() => {
        async function search(){
            if(!searchValue){
                return
            }
            setsearchResultUser([])
            setsearchResultProject([])
            const qUser = query(database.users,where('username','==',searchValue))
            const qProjects = query(database.projectsGroup('info'),where('name','==',searchValue))
            await getDocs(qUser).then(existingFiles => {
                if(existingFiles.docs[0] != undefined){
                    setsearchResultUser(existingFiles.docs[0].data())
                }
            }
            )
            await getDocs(qProjects).then(existingFiles => {
                if(existingFiles.docs[0] != undefined){
                    setsearchResultProject(existingFiles.docs[0].data())
                }
            }
            )
          }

          search()

      },[searchValue])
      console.log(searchResultUser,searchResultProject)

  return (
    <header className='h-16 bg-gray-50 fixed w-full top-0 shadow-lg'>
        <div className='w-3/4 mx-auto'>
            <div className='absolute top-2 h-12 w-12'>
                <img src='https://firebasestorage.googleapis.com/v0/b/test-project-42b86.appspot.com/o/logo.webp?alt=media&token=6509fcd6-c2b3-4324-9db5-927d3e8f9a39'/>
            </div>
            
            <div className='flex flex-col items-end'>
                <div onClick={menuVisibility} className='h-12 w-12 p-2 group md:hidden'>
                    <svg xmlns="<http://www.w3.org/2000/svg>" viewBox="0 0 20 20" fill="currentColor" className="h-full w-full group-hover:fill-blue-500">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <ul className={` ${menuItems} w-full space-y-2 pr-3 font-semibold text-xl text-right md:h-12 md:flex md:flex-row md:items-center md:justify-end md:space-x-5 md:space-y-0`}>
                    <div className='w-1/2 flex flex-row'>
                        <div className='w-full'>
                            <input onClick={searchState} onChange={e => setsearchValue(e.target.value)} placeholder='Search...' className='w-full bg-gray-50 px-1.5 py-1 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'  />
                            <div className={`fixed ${searchBar} flex flex-row items-start mx-9 mt-1 w-1/3 bg-gray-100 shadow-xl border-[1.5px] p-2 rounded-lg`}>
                                {!searchValue && (
                                    <div className='w-1/2 flex flex-col'>
                                        <span className='flex flex-row'>user:1234<h1 className='text-sm'>search by user</h1></span>
                                        <span className='flex flex-row'>[tags]<h1 className='text-sm'>search any tag</h1></span>
                                        <span className='flex flex-row'>"words exact"<h1 className='text-sm'>any posts</h1></span>
                                    </div>
                                )}
                                {searchValue && (
                                    <div className='w-full flex flex-col'>
                                        {searchResultUser && (
                                            <div className='flex flex-col'>
                                                User
                                                <Link to={`/profile/${searchResultUser.uid}`} className='flex flex-row h-full w-full'>
                                                    <img src={searchResultUser.profilePic} width='36px' height='36px' />
                                                    <h1>{searchResultUser.username}</h1>
                                                </Link>
                                            </div>
                                        )}
                                        {searchResultProject && (
                                            <div className='flex flex-col'>
                                                Project
                                                <Link to={`/${searchResultProject.name}`} className='flex flex-row h-full w-full'>
                                                    <h1 className='mx-2'>Name: {searchResultProject.name}</h1>
                                                    <h1 className='mx-2'>Description: {searchResultProject.description}</h1>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {/* <div className='w-1/2'>hi</div> */}
                            </div>
                        </div>
                    </div>
                    <li className='cursor-pointer hover:text-blue-500'>
                        {!currentuser && <Link to={'/login'}>Log in</Link> }
                    </li>
                    <li className='cursor-pointer hover:text-blue-500'>
                        {currentuser && <Link to={'/home'}>Home</Link> }
                    </li>

                    <li className='cursor-pointer hover:text-blue-500'>
                        {currentuser && <Link className='mx-auto' to={'/profile'}>My Profile</Link> }
                    </li>

                    <li className='cursor-pointer hover:text-blue-500'>
                        {currentuser && <span onClick={submitlogouthandler}>Logout</span> }
                    </li>
                </ul>
            </div>
        </div>
    </header>
  )
}
