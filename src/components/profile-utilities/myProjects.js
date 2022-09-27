import { getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { auth, database } from '../../firebase'
import NavBar from '../navbar'

export default function MyProjects() {                                              // my project page
    
    const { currentuser, username } = useAuth()
    const [myProjectsData,setmyProjectsData] = useState([])
    const [projectsData,setprojectsData] = useState([])

    useEffect(() => {                                                               // fetch all project
        async function fetchProjects(){
            let myProjectDataArray = []
            let projectDataArray = []
            if(username != undefined){
                const myProjectsQuery = query(database.projectsGroup('info'),where('admin','==',{uid:currentuser.uid,username:username}))
                const projectsQuery = query(database.projectsGroup('info'),where('participants','array-contains',{uid:currentuser.uid,username:username}))
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
    },[username])
    console.log(auth)

    return (
    <>

            <div className='flex flex-row float-right'>                                 {/* all projects div tag */}

                <div className='flex w-full p-2'>

                                                                                                    
                    <div className='flex flex-col w-1/2'>                                           {/* my projects div tag */}
                        <span>My Projects</span>
                        {/* {!projectsExists && <span>No projects</span>} */}
                        {myProjectsData && <div>{myProjectsData.map(doc => <div className='flex flex-row bg-gray-50 border rounded mt-2 mr-16 dark:border-gray-500 dark:bg-black' key={doc.name}>
                            <div className='flex flex-col'>
                                <Link to={`/${doc.name}`} className='px-3 mt-3'>Project Name: {doc.name}</Link>
                                <h2 className='px-3 mt-3'>Admin: {doc.admin.username}</h2>
                                <h3 className='p-3'>Project description: {doc.tags}</h3>
                            </div>
                            <Link to={`/${doc.name}`} className='bg-green-300 rounded-xl p-1 h-fit'>Open project</Link>
                        </div>)}</div>}
                    </div>

                    <div className='flex flex-col w-1/2'>                                          {/* rest projects div tag */}
                        <span>Projects</span>
                        {/* {!projectsExists && <span>No projects</span>} */}
                        {projectsData && <div>{projectsData.map(doc => <div className='flex flex-row bg-gray-50 border rounded mt-2 mr-16 dark:border-gray-500 dark:bg-black' key={doc.name}>
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
