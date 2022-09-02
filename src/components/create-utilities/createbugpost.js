import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { database } from '../../firebase'
import NavBar from '../navbar'

export default function CreateBugPost() {
    const [title,settitle] = useState()
    const [body,setbody] = useState()
    const [tags,settags] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    async function createBugPost(e){                                          // form submit function
        e.preventDefault()
        try{
            await addDoc(collection(database.projects,id,'data'),{            // adding bug post data to project CollectionGroup data
                title: title,
                body: body,
                tags: tags,
                comments: [],
                answers: [],
                creationTime: database.getCurrentTimeStamp(),
                votes: []
            }).then(navigate(`/${id}/bugposts`))                              // redirecting to all bugposts after form submission
        }catch(error){
            console.log(error)
        }
    }

  return (
    <>
        <NavBar />
        
        <aside className='w-1/5 fixed mt-16 left-0 top-0 h-screen border-r-[1.5px]'>      {/* left side bar */}
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

        <div className='float-right w-4/5 mt-16'>                                                       {/* add bugpost form */}
            <form className='flex flex-col m-10 p-2 border-[1.5px] rounded' onSubmit={createBugPost}>
                <label className='text-xl font-semibold mx-auto'>Create a Bug Post</label>
                <input className='p-1 m-3 border-[1.5px] border-gray-400 rounded' placeholder='Title' onChange={e => settitle(e.target.value)}/>
                <textarea className='p-1 m-3 h-48 border-[1.5px] border-gray-400 rounded' placeholder='Body' onChange={e => setbody(e.target.value)}/>
                <input className='p-1 m-3 border-[1.5px] border-gray-400 rounded' placeholder='Tags' onChange={e => settags(e.target.value)}/>
                <button className='text-white m-3 font-medium mt-7 px-4 py-1 w-fit border outline-none rounded bg-blue-500 hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-600'>Create</button>
            </form>
        </div>
    </>
  )
}
