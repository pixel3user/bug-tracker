import { doc, setDoc } from 'firebase/firestore'
import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'
import NavBar from '../navbar'

export default function CreateProject() {

    const titleRef = useRef()
    const tagsRef = useRef()
    const descriptionRef = useRef()
    const repoRef = useRef()
    const navigate = useNavigate()
    const { currentuser } = useAuth()

    async function createProject(e){                                                      // create project form onsubmit function
        e.preventDefault()

        try{
            await setDoc(doc(database.projects,titleRef.current.value,'info','data'),{    // adding info collection to project collection in database
                name: titleRef.current.value,
                description: descriptionRef.current.value,
                tags: tagsRef.current.value,
                admin: currentuser.uid,
                answers: [],
                participants: [],
                repoLink: repoRef.current.value
            }).then(navigate('/my-projects'))                                             // redirecting after adding the info collection
        }catch(error){
            console.log(error)
        }
    }

  return (
    <>
        <NavBar />

        <aside className='w-1/5 fixed mt-16 left-0 top-0 h-screen border-r-[1.5px]'>          {/* left side bar */}
            <div className='float-right flex flex-col mt-5'>
              <Link to={'/home'} className='flex flex-row mb-2'>
                <h1 className='mr-20 p-2 text-md'>Home</h1>
              </Link>
              <Link to={'/my-projects'} className='flex flex-row mb-2'>
                <h1 className='mr-20 p-2 text-md'>My Project</h1>
              </Link>
              <Link to={'/create-project'} className='flex flex-row mb-2 bg-gray-200 rounded-l-lg border-r-[3px] border-green-500'>
                <h1 className='mr-20 p-2 text-md'>Create Project</h1>
              </Link>
            </div>
            <div></div>
          </aside>

        <div className='float-right w-4/5 mt-16'>                                                         {/* create project form */}
            <form className='flex flex-col m-10 p-2 border-[1.5px] rounded' onSubmit={createProject}>
                <label className='text-xl font-semibold mx-auto'>Create a New Project</label>
                <input ref={titleRef} className='p-1 m-3 border-[1.5px] border-gray-400 rounded' placeholder='Project Name' />
                <textarea ref={descriptionRef} className='p-1 m-3 h-48 border-[1.5px] border-gray-400 rounded' placeholder='Project Description' />
                <input ref={tagsRef} className='p-1 m-3 border-[1.5px] border-gray-400 rounded' placeholder='Tags' />
                <input ref={repoRef} className='p-1 m-3 border-[1.5px] border-gray-400 rounded' placeholder='Link to repo' />
                <button className='text-white m-3 font-medium mt-7 px-4 py-1 w-fit border outline-none rounded bg-blue-500 hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-600'>Create</button>
            </form>
        </div>
    </>
  )
}
