import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { getDocs, query, where } from 'firebase/firestore'
import { database } from '../firebase'

export default function NavBar({showChat,setshowChat}) {                          // i really never have to change this shitty navbar so , lets just save time here. bye

    const [menuItems, setmenuItems] = useState('hidden')
    const { currentuser, logout,data } = useAuth()
    const [searchValue,setsearchValue] = useState('')
    const [searchBar,setsearchBar] = useState('hidden')
    const [searchResultUser, setsearchResultUser] = useState([])
    const [searchResultProject, setsearchResultProject] = useState([])
    const navigate = useNavigate()

    function menuVisibility(e){
        e.preventDefault()
        menuItems == 'hidden' ? setmenuItems('') : setmenuItems('hidden')
    }

    function submitlogouthandler(e){
        e.preventDefault()

        try{
            logout()
            navigate("/")
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

  return (
    <header className='h-12 bg-navBar border-t-[3px] border-navBarBorder dark:bg-black dark:border-b-[1px] dark:border-b-white fixed w-full top-0 shadow-lg'>
        <div className='w-5/6 mx-auto'>
            <div className='absolute text-xl dark:text-white flex justify-center items-center h-12 w-12'>
                {/* <img src='https://firebasestorage.googleapis.com/v0/b/test-project-42b86.appspot.com/o/logo.webp?alt=media&token=6509fcd6-c2b3-4324-9db5-927d3e8f9a39'/> */}
                <span className='font-light'>Bug</span>
                <span className='font-bold'>Tracker</span>
            </div>
            
            <div className='flex flex-col items-end'>
                <div onClick={menuVisibility} className='h-12 w-12 p-2 group md:hidden'>
                    <svg xmlns="<http://www.w3.org/2000/svg>" viewBox="0 0 20 20" fill="currentColor" className="h-full w-full group-hover:fill-blue-500">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <ul className={`${menuItems} w-full space-y-2 pr-3 font-semibold text-xl text-right md:h-12 md:flex md:flex-row md:items-center md:justify-end md:space-x-5 md:space-y-0 dark:text-white`}>
                    <div className='w-1/2 flex flex-row'>
                        <div className='w-full'>
                            <div className='flex flex-row'>
                                {/* <svg className='absolute inline-block' xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                                    <path fill="#727272" d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"/>
                                </svg> */}
                                {/* <img src='/images/search.svg' width={'28px'} height={'28px'} /> */}
                                <input onClick={searchState} onChange={e => setsearchValue(e.target.value)} placeholder='Search...' className='w-full hidden lg:block bg-white px-1.5 py-0.5 border border-borderBlack text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'  />
                            </div>

                            <div className={`fixed ${searchBar} flex flex-row bg-white dark:bg-black items-start mx-9 mt-1 w-1/3 shadow-xl border-[1px] border-borderBlack dark:border-white p-2 rounded-lg`}>
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
                                                    <img src={searchResultUser.photoURL} width='36px' height='36px' />
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
                    <li className='cursor-pointer hover:text-blue'>
                        {!currentuser && <Link to={'/login'}>Log in</Link> }
                    </li>
                    <li className='cursor-pointer hidden lg:block'>
                        {currentuser && <Link className='mx-auto' to={'/profile'}>
                            <img className='w-8 h-8 rounded-lg object-cover' src={`${data.picURL}`} />
                        </Link> }
                    </li>
                    <li className='cursor-pointer hidden lg:block'>
                        {currentuser && <Link className='flex justify-center items-center' to={'/home'}>
                            <img className='w-8 h-8' src='/images/home.svg' />
                        </Link> }
                    </li>
                    <li className='cursor-pointer hidden lg:block'>
                        {currentuser && <button onClick={() => setshowChat(!showChat)} className='flex justify-center items-center'>
                            <img className='w-7 h-7' src='/images/chat.svg' />
                        </button> }
                    </li>

                    <li className='cursor-pointer hidden lg:block hover:text-blue-500'>
                        {currentuser && <button className='flex justify-center items-center' onClick={submitlogouthandler}>
                            <img className='w-7 h-7' src='/images/logout.svg' />
                        </button> }
                    </li>
                </ul>
            </div>
        </div>
    </header>
  )
}
