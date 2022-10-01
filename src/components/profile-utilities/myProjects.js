import { getDocs, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { auth, database } from '../../firebase'
import NavBar from '../navbar'

export default function MyProjects() {                                              // my project page
    
    const { currentuser ,data} = useAuth()
    const [myProjectsData,setmyProjectsData] = useState([])
    const [projectsData,setprojectsData] = useState([])

    useEffect(() => {                                                               // fetch all project
        async function fetchProjects(){
            let myProjectDataArray = []
            let projectDataArray = []
            if(data.username != undefined){
                const myProjectsQuery = query(database.projectsGroup('info'),where('admin','==',{uid:currentuser.uid,username:data.username}))
                const projectsQuery = query(database.projectsGroup('info'),where('participants','array-contains',{uid:currentuser.uid,username:data.username}))
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

        }

        fetchProjects()
    },)

    return (
    <>

            <div className='flex flex-row float-right'>                                 {/* all projects div tag */}

                <div className='flex w-full p-2'>

                                                                                                    
                    <div className='flex flex-col w-1/2'>                                           {/* my projects div tag */}
                        <span>My Projects</span>
                        {/* {!projectsExists && <span>No projects</span>} */}
                        {myProjectsData && <div>{myProjectsData.map(doc => <Link to={`/${doc.name}`} className='flex flex-row bg-formColor border-[1px] border-borderBlack mt-2 mr-16 dark:border-gray-500 dark:bg-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100' key={doc.name}>
                            <div className='flex flex-col'>
                                <Link to={`/${doc.name}`} className='px-3 mt-3'>Project Name: {doc.name}</Link>
                                <h2 className='px-3 mt-3'>Admin: {doc.admin.username}</h2>
                                <h3 className='p-3'>Project description: {doc.description}</h3>
                            </div>
                        </Link>)}</div>}
                    </div>

                    <div className='flex flex-col w-1/2'>                                          {/* rest projects div tag */}
                        <span>Projects</span>
                        {/* {!projectsExists && <span>No projects</span>} */}
                        {projectsData && <div>{projectsData.map(doc => <Link to={`/${doc.name}`} className='flex flex-row bg-formColor border-[1px] border-borderBlack mt-2 mr-16 dark:border-gray-500 dark:bg-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100' key={doc.name}>
                            <div className='flex flex-col'>
                                <Link to={`/${doc.name}`} className='px-3 mt-3'>Project Name: {doc.name}</Link>
                                <h2 className='px-3 mt-3'>Admin: {doc.admin}</h2>
                                <h3 className='p-3'>Project description: {doc.tags}</h3>
                            </div>
                        </Link>)}</div>}
                    </div>
                </div>
            </div>
    </>
  )
}
