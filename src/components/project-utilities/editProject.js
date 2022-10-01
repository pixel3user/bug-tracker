import { getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'

export default function EditProject() {                               // edit your project page

    const [tags,settags] = useState()
    const [description,setdescription] = useState()
    const [repoLink,setrepoLink] = useState()
    const navigate = useNavigate()
    const { currentuser } = useAuth()
    const [projectData,setprojectData] = useState()
    const [projectRef,setprojectRef] = useState()

    const { id } = useParams()

    async function updateProject(e){                                  // update project data submit handler
        e.preventDefault()

        try{
            await updateDoc(database.project(id),{                    // update project info collection
                description: description,
                tags: tags,
                repoLink: repoLink
            }).then(navigate('/my-projects'))                         // redirect to my-project page after updating project
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {                                                 // fetch project details on page load
        async function fetchProject(){
            const projectsQuery = query(database.projectsGroup('info'),where('name','==',id)) // does not really required a query here but i don't want to change it rn
            await getDocs(projectsQuery).then(existingFiles => {      // instead of query edit:- (database.project(id)) can be used
                const existingFile = existingFiles.docs[0]
                if(existingFile !== undefined){                       // adding project old data to all input field for changes
                    setprojectData(existingFile.data())
                    setdescription(existingFile.data().description)
                    settags(existingFile.data().tags)
                    setrepoLink(existingFile.data().repoLink)
                    setprojectRef(existingFile.ref)
                }
            })


        }

        fetchProject()
    },[])


  return (
    <>
        
        {projectData && (projectData.admin.uid == currentuser.uid ? (               // update project details form
            <form className='flex flex-col m-10 p-2 border-[1px] border-borderBlack bg-formColor dark:bg-black' onSubmit={updateProject}>
                <label className='text-xl font-semibold mx-auto'>Edit Project</label>
                <label className='flex flex-col m-3'>
                    <span className='text-md font-semibold'>Description</span>
                    <textarea value={`${description}`} onChange={e => setdescription(e.target.value)} className='p-1 h-48 border-[1px] border-borderBlack rounded dark:text-black' placeholder='Project Description' />
                </label>
                <label className='flex flex-col m-3'>
                    <span className='text-md font-semibold'>Tags</span>
                    <input value={`${tags}`} onChange={e => settags(e.target.value)} className='p-1 border-[1px] border-borderBlack rounded dark:text-black' placeholder='Tags' />
                </label>
                <label className='flex flex-col m-3'>
                    <span className='text-md font-semibold'>Link to repo</span>
                    <input value={`${repoLink}`} onChange={e => setrepoLink(e.target.value)} className='p-1 border-[1px] border-borderBlack rounded dark:text-black' placeholder='Link to repo' />
                </label>
                <button className='text-white m-3 font-medium mt-7 px-4 py-1 w-fit border outline-none rounded bg-blue hover:bg-darkBlue hover:shadow-sm hover:shadow-blue-600'>Update</button>
            </form>
        ) : (
            <div className='float-right w-4/5 mt-16'>
                <h1 className='m-10'>You do not have permission to edit this project</h1>
            </div>
        ))}
    </>
  )
}
