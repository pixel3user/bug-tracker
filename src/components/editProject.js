import { doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { database } from '../firebase'
import NavBar from './navbar'

export default function EditProject() {

    const [name,setname] = useState()
    const [tags,settags] = useState()
    const [description,setdescription] = useState()
    const [repoLink,setrepoLink] = useState()
    const navigate = useNavigate()
    const { currentuser } = useAuth()
    const [projectData,setprojectData] = useState()
    const [projectRef,setprojectRef] = useState()

    const { id } = useParams()

    async function updateProject(e){
        e.preventDefault()

        try{
            await updateDoc(database.project(id),{
                name: name,
                description: description,
                tags: tags,
                repoLink: repoLink
            }).then(navigate('/my-projects'))
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {

        async function fetchProject(){
            const projectsQuery = query(database.projectsGroup('info'),where('name','==',id))
            await getDocs(projectsQuery).then(existingFiles => {
                const existingFile = existingFiles.docs[0]
                if(existingFile !== undefined){
                    setprojectData(existingFile.data())
                    setname(existingFile.data().name)
                    setdescription(existingFile.data().description)
                    settags(existingFile.data().tags)
                    setrepoLink(existingFile.data().repoLink)
                    setprojectRef(existingFile.ref)
                }
            })


        }

        fetchProject()
    },[])

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
        
        {projectData && (projectData.admin == currentuser.uid ? (
            <div className='float-right w-4/5 mt-16'>
            <form className='flex flex-col m-10 p-2 border-[1.5px] rounded' onSubmit={updateProject}>
                <label className='text-xl font-semibold mx-auto'>Edit Project</label>
                <input value={`${name}`} onChange={e => setname(e.target.value)} className='p-1 m-3 border-[1.5px] border-gray-400 rounded' placeholder='Project Name' />
                <textarea value={`${description}`} onChange={e => setdescription(e.target.value)} className='p-1 m-3 h-48 border-[1.5px] border-gray-400 rounded' placeholder='Project Description' />
                <input value={`${tags}`} onChange={e => settags(e.target.value)} className='p-1 m-3 border-[1.5px] border-gray-400 rounded' placeholder='Tags' />
                <input value={`${repoLink}`} onChange={e => setrepoLink(e.target.value)} className='p-1 m-3 border-[1.5px] border-gray-400 rounded' placeholder='Link to repo' />
                <button className='text-white m-3 font-medium mt-7 px-4 py-1 w-fit border outline-none rounded bg-blue-500 hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-600'>Update</button>
            </form>
        </div>
        ) : (
            <div className='float-right w-4/5 mt-16'>
                <h1 className='m-10'>You do not have permission to edit this project</h1>
            </div>
        ))}
    </>
  )
}
