import { arrayUnion, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { auth, database } from '../firebase'
import AddParticipants from './addparticipants'
import NavBar from './navbar'

export default function Project() {
    const { id } = useParams()
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
                    setauthentication((existingFile.data().admin == currentuser.uid || existingFile.data().participants.indexOf(currentuser.uid) != -1))
                }
            })


        }

        fetchProject()
    },[])

    async function addRepoLink(e){
        e.preventDefault()
        try{
            await updateDoc(database.project(projectData.name),{
                repoLink: repoLinkRef.current.value
            })
        }catch(error){
            console.log(error)
        }
    }

    async function sendRequest(e){
        e.preventDefault()
        console.log(currentuser.uid," had requested access to project",projectData.name)
        const requestData = {project: projectData.name, from: currentuser.uid}

        try{
            await updateDoc(database.public(projectData.admin),{
                requests: arrayUnion(requestData)
            })
        }catch(error){
            console.log(error)
        }
    }

    console.log(projectData)

  return (
    <>
        <NavBar />

        <aside className='w-1/5 fixed mt-16 left-0 top-0 h-screen border-r-[1.5px]'>
            <div className='float-right flex flex-col mt-5'>
              <Link to={'/home'} className='flex flex-row mb-2'>
                <h1 className='mr-20 p-2 text-md'>Home</h1>
              </Link>
              <Link to={'/my-projects'} className='flex flex-row mb-2'>
                <h1 className='mr-20 p-2 text-md'>My Project</h1>
              </Link>
              <Link to={'/create-project'} className='flex flex-row mb-2'>
                <h1 className='mr-20 p-2 text-md'>Create Project</h1>
              </Link>
            </div>
            <div></div>
          </aside>

        <div className='flex flex-col float-right w-4/5 mt-16'>
            <div className='p-3'>
                {!loading && (
                    <div className='flex flex-row bg-gray-50 border rounded'>
                        <div className='m-5'>
                            <span to={`/${projectData.name}`}>Project Name: {projectData.name}</span>
                            <h2>Description: {projectData.description}</h2>
                            <h2>Admin: {projectData.admin}</h2>
                            <h3>Tags: {projectData.tags}</h3>
                        </div>
                        {projectData.admin == currentuser.uid && <div className='m-5'>
                            <AddParticipants projectRef={projectRef}/>
                        </div>}
                        { authentication && <Link to={`/${id}/addbugpost`} className='bg-green-400 h-fit rounded-xl p-1 m-5'>Create a bug post</Link>}
                        { authentication && <Link to={`/${id}/bugposts`} className='bg-green-400 h-fit rounded-xl p-1 m-5'>View bug posts</Link>}
                        { !authentication && <button onClick={sendRequest} className='bg-green-400 h-fit rounded-xl p-1 m-5'>Request Access</button>}
                        {!projectData.repoLink ? (
                            <form className='flex flex-row' onSubmit={addRepoLink}>
                                <input type='url' ref={repoLinkRef} className='h-fit m-5 bg-gray-50 px-1.5 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block'/>
                                <button className='bg-green-400 h-fit rounded-xl p-1 mt-5'>
                                    Add repo
                                </button>
                            </form>
                        ): (
                            <a href={`${projectData.repoLink}`} target='_blank' className='bg-green-400 h-fit rounded-xl p-1 mt-5'>
                                Open repo
                            </a>
                        )}
                        {projectData.admin == currentuser.uid && (
                            <Link to={`/${id}/edit`} className='bg-green-400 h-fit rounded-xl p-1 m-5'>
                                Edit Project
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    </>
  )
}
