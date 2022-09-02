import { getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'
import NavBar from '../navbar'

export default function MyProjects() {                                              // my project page
    
    const { currentuser } = useAuth()
    const [myProjectsData,setmyProjectsData] = useState([])
    const [projectsData,setprojectsData] = useState([])

    useEffect(() => {                                                               // fetch all project

        async function fetchProjects(){
            let myProjectDataArray = []
            let projectDataArray = []
            const myProjectsQuery = query(database.projectsGroup('info'),where('admin','==',currentuser.uid))
            const projectsQuery = query(database.projectsGroup('info'),where('participants','array-contains',currentuser.uid))
            const myProjectsQuerySnapshot = await getDocs(myProjectsQuery)          // fetch user created project
            const projectsQuerySnapshot = await getDocs(projectsQuery)              // fetch project user has access to

            myProjectsQuerySnapshot.forEach((doc) => {
                myProjectDataArray.push(doc.data())                                 // push user project in myProjectDataArray state
            })
            setmyProjectsData(myProjectDataArray)

            projectsQuerySnapshot.forEach((doc) => {
                projectDataArray.push(doc.data())                                   // push rest project in projectDataArray state
            })
            setprojectsData(projectDataArray)

        }

        fetchProjects()
    },[])

  return (
    <>
        <NavBar />
        

        <aside className='w-1/5 fixed mt-16 left-0 top-0 h-screen border-r-[1.5px]'>          {/* left side bar */}
            <div className='float-right flex flex-col mt-5'>
              <Link to={'/home'} className='flex flex-row mb-2'>
                <h1 className='mr-20 p-2 text-md'>Home</h1>
              </Link>
              <Link to={'/my-projects'} className='flex flex-row bg-gray-200 rounded-l-lg mb-2 border-r-[3px] border-green-500'>
                <h1 className='mr-20 p-2 text-md'>My Project</h1>
              </Link>
              <Link to={'/create-project'} className='flex flex-row mb-2'>
                <h1 className='mr-20 p-2 text-md'>Create Project</h1>
              </Link>
            </div>
            <div></div>
          </aside>

            <div className='flex flex-row float-right w-4/5 mt-16'>                                 {/* all projects div tag */}

                <div className='flex w-full p-2'>

                                                                                                    
                    <div className='flex flex-col w-1/2'>                                           {/* my projects div tag */}
                        <span>My Projects</span>
                        {/* {!projectsExists && <span>No projects</span>} */}
                        {myProjectsData && <div>{myProjectsData.map(doc => <div className='flex flex-row bg-gray-50 border rounded mt-2 mr-16' key={doc.name}>
                            <div className='flex flex-col'>
                                <Link to={`/${doc.name}`} className='px-3 mt-3'>Project Name: {doc.name}</Link>
                                <h2 className='px-3 mt-3'>Admin: {doc.admin}</h2>
                                <h3 className='p-3'>Project description: {doc.tags}</h3>
                            </div>
                            <Link to={`/${doc.name}`} className='bg-green-300 rounded-xl p-1 h-fit'>Open project</Link>
                        </div>)}</div>}
                    </div>

                    <div className='flex flex-col w-1/2'>                                          {/* rest projects div tag */}
                        <span>Projects</span>
                        {/* {!projectsExists && <span>No projects</span>} */}
                        {projectsData && <div>{projectsData.map(doc => <div className='flex flex-row bg-gray-50 border rounded mt-2 mr-16' key={doc.name}>
                            <div className='flex flex-col'>
                                <Link to={`/${doc.name}`} className='px-3 mt-3'>Project Name: {doc.name}</Link>
                                <h2 className='px-3 mt-3'>Admin: {doc.admin}</h2>
                                <h3 className='p-3'>Project description: {doc.tags}</h3>
                            </div>
                            <Link to={`/${doc.name}`} className='bg-green-300 rounded-xl p-1 h-fit'>Open project</Link>
                        </div>)}</div>}
                    </div>
                </div>
            </div>
    </>
  )
}
