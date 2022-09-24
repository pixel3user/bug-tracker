import { doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'

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

            <form className='flex flex-col m-10 p-2 border-[1.5px] rounded' onSubmit={createProject}>
                <label className='text-xl font-semibold mx-auto'>Create a New Project</label>
                <input ref={titleRef} className='p-1 m-3 border-[1.5px] border-gray-400 rounded dark:bg-gray-700' placeholder='Project Name' />
                <textarea ref={descriptionRef} className='p-1 m-3 h-48 border-[1.5px] border-gray-400 rounded dark:bg-gray-700' placeholder='Project Description' />
                <input ref={tagsRef} className='p-1 m-3 border-[1.5px] border-gray-400 rounded dark:bg-gray-700' placeholder='Tags' />
                <input ref={repoRef} className='p-1 m-3 border-[1.5px] border-gray-400 rounded dark:bg-gray-700' placeholder='Link to repo' />
                <button className='text-white m-3 font-medium mt-7 px-4 py-1 w-fit border outline-none rounded bg-blue-500 hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-600'>Create</button>
            </form>
    </>
  )
}
