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
    const { currentuser} = useAuth()

    async function createProject(e){                                                      // create project form onsubmit function
        e.preventDefault()

        try{
            await setDoc(doc(database.projects,titleRef.current.value,'info','data'),{    // adding info collection to project collection in database
                name: titleRef.current.value,
                projectPic: null,
                description: descriptionRef.current.value,
                tags: tagsRef.current.value,
                admin: {uid: currentuser.uid, username: currentuser.displayName},
                answers: [],
                participants: [],
                repoLink: repoRef.current.value,
                creationTime: database.getCurrentTimeStamp()
            }).then(navigate('/my-projects'))                                             // redirecting after adding the info collection
        }catch(error){
            console.log(error)
        }
    }

  return (
    <>

            <form className='flex flex-col m-10 p-2 border-[1.5px] border-formBorderColor bg-formColor dark:bg-black' onSubmit={createProject}>
                <label className='text-xl font-semibold mx-auto'>Create a New Project</label>
                <label className='flex flex-col m-3'>
                    <span className='text-md font-semibold'>Project name</span>
                    <input ref={titleRef} className='p-1 border-[1.5px] border-inputBorderColor rounded dark:text-black' placeholder='Project Name' />
                </label>
                <label className='flex flex-col m-3'>
                    <span className='text-md font-semibold'>Description</span>
                    <textarea ref={descriptionRef} className='p-1 h-48 border-[1.5px] border-inputBorderColor rounded dark:text-black' placeholder='Project Description' />
                </label>
                <label className='flex flex-col m-3'>
                    <span className='text-md font-semibold'>Tags</span>
                    <input ref={tagsRef} className='p-1 border-[1.5px] border-inputBorderColor rounded dark:text-black' placeholder='Tags' />
                </label>
                <label className='flex flex-col m-3'>
                    <span className='text-md font-semibold'>Link to repo</span>
                    <input ref={repoRef} className='p-1 border-[1.5px] border-inputBorderColor rounded dark:text-black' placeholder='Link to repo' />
                </label>
                <button className='text-white m-3 font-medium mt-7 px-4 py-1 w-fit border outline-none rounded bg-blue hover:bg-darkBlue'>Create</button>
            </form>
    </>
  )
}
