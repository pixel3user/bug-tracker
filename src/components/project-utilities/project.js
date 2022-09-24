import { arrayUnion, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'
import AddParticipants from './addparticipants'

export default function Project() {                            // this page is mostly same as editProject.js so look for comments there
    const { id } = useParams()                                 // i am mostly tired explaining to myself twice 
    const [projectData,setprojectData] = useState([])
    const [projectRef,setprojectRef] = useState()
    const [loading ,setloading] = useState(true)
    const { currentuser } = useAuth()
    const [authentication,setauthentication] = useState(false)
    const repoLinkRef = useRef()

    useEffect(() => {
        async function fetchProject(){
            const projectsQuery = query(database.projectsGroup('info'),where('name','==',id))
            await getDocs(projectsQuery).then(existingFiles => {
                const existingFile = existingFiles.docs[0]
                if(existingFile !== undefined){
                    setprojectData(existingFile.data())
                    setprojectRef(existingFile.ref)
                    setloading(false)
                    setauthentication(                           // if currentuser is admin of project or is a participant set authentication to true
                        (existingFile.data().admin == currentuser.uid || existingFile.data().participants.indexOf(currentuser.uid) != -1)
                        )
                }
            })


        }

        fetchProject()
    },[])

    async function addRepoLink(e){                              // onsubmit handler for updating repoLink
        e.preventDefault()
        try{
            await updateDoc(database.project(projectData.name),{
                repoLink: repoLinkRef.current.value
            })
        }catch(error){
            console.log(error)
        }
    }

    async function sendRequest(e){                              // onsubmit handler for sending request to access a project
        e.preventDefault()
        // console.log(currentuser.uid," had requested access to project",projectData.name)
        const requestData = {project: projectData.name, from: currentuser.uid}                  // request object

        try{
            await updateDoc(database.public(projectData.admin),{                                // updating public user data to add
                requests: arrayUnion(requestData)                                               // request to the admin of the project
            })
        }catch(error){
            console.log(error)
        }
    }


  return (
    <>
            <div className='p-3'>
                {!loading && (
                    <>
                    <div className='flex flex-col bg-gray-50 border rounded dark:bg-black'>
                        <div className='m-5'>
                            <div className='overflow-hidden h-[320px]'>
                                <img src='/images/background.jpg' />
                            </div>
                            <span to={`/${projectData.name}`}>{projectData.name}</span>
                            <h2>Description: {projectData.description}</h2>
                            <h2>Admin: {projectData.admin}</h2>
                            <h3>Tags: {projectData.tags}</h3>
                        </div>

                        {!projectData.repoLink ? (
                                                                                    // add repoLink form

                            <form className='flex flex-row' onSubmit={addRepoLink}>
                                <input type='url' ref={repoLinkRef} className='h-fit m-5 bg-gray-50 px-1.5 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block'/>
                                <button className='bg-green-400 h-fit rounded-xl p-1 mt-5'>
                                    Add repo
                                </button>
                            </form>
                        ): (                                                        // open repo in new tab link

                            <a href={`${projectData.repoLink}`} target='_blank' className='m-5 w-fit border-[1px] rounded p-1 bg-gray-100 text-sm font-light dark:text-black'>
                                open repo
                            </a>
                        )}

                    </div>
                    <div className='flex flex-row bg-gray-50 mx-auto mt-3 border rounded dark:bg-black'>

                        {projectData.admin == currentuser.uid &&
                            <AddParticipants projectRef={projectRef}/>
                            }

                        {/* project utilities buttons, mostly very simple */}

                        { authentication && (
                        // create new bug post 

                            <Link to={`/${id}/addbugpost`} className='bg-gray-100 hover:bg-gray-200 dark:bg-gray-300 shadow-lg h-fit rounded-xl p-1 m-5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100'>
                                <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M22.65 34h3v-8.3H34v-3h-8.35V14h-3v8.7H14v3h8.65ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z"/></svg>
                                <span className='mx-auto text-sm dark:text-black'>Create bug post</span>
                            </Link>
                            )}

                        { authentication && (
                                                                                    // view all bug posts

                        <Link to={`/${id}/bugposts`} className='bg-gray-100 hover:bg-gray-200 dark:bg-gray-300 shadow-lg h-fit rounded-xl p-1 m-5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100'>
                            <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11.1 44q-2.2 0-3.725-1.525T5.85 38.75V32.5h6.35V4l3 3 3-3 2.95 3 3-3 3 3 3-3 3 3 3-3 3 3 3-3v34.75q0 2.2-1.525 3.725T36.9 44Zm25.8-3q1 0 1.625-.625t.625-1.625V9H15.2v23.5h19.45v6.25q0 1 .625 1.625T36.9 41ZM17.85 16.9v-3h12v3Zm0 6.7v-3h12v3Zm16.65-6.7q-.6 0-1.05-.45Q33 16 33 15.4q0-.6.45-1.05.45-.45 1.05-.45.6 0 1.05.45.45.45.45 1.05 0 .6-.45 1.05-.45.45-1.05.45Zm0 6.45q-.6 0-1.05-.45-.45-.45-.45-1.05 0-.6.45-1.05.45-.45 1.05-.45.6 0 1.05.45.45.45.45 1.05 0 .6-.45 1.05-.45.45-1.05.45ZM11.05 41h20.6v-5.5H8.85v3.25q0 1 .625 1.625T11.05 41Zm-2.2 0v-5.5V41Z"/></svg>
                            <span className='mx-auto text-sm dark:text-black'>View bug posts</span>
                        </Link>
                        )}
                        
                        { !authentication && (
                                                                                    // send access request to project admin  

                        <button onClick={sendRequest} className='bg-green-400 h-fit rounded-xl p-1 m-5'>Request Access</button>
                        )}

                                                                                    {/* edit project deatils button if you are an admin */}
                        {projectData.admin == currentuser.uid && (
                            <Link to={`/${id}/edit`} className='bg-gray-100 hover:bg-gray-200 dark:bg-gray-300 shadow-lg h-fit rounded-xl p-1 m-5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100'>
                                <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 39h2.2l22.15-22.15-2.2-2.2L9 36.8Zm30.7-24.3-6.4-6.4 2.1-2.1q.85-.85 2.1-.85t2.1.85l2.2 2.2q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Zm-5.35-1.05-1.1-1.1 2.2 2.2Z"/></svg>
                                <span className='mx-auto text-sm dark:text-black'>Edit project</span>
                            </Link>
                        )}

                    </div>
                    </>
                )}
            </div>
    </>
  )
}
