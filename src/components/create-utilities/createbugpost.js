import { addDoc, collection } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { database } from '../../firebase'

export default function CreateBugPost() {
    const [title,settitle] = useState()
    const [body,setbody] = useState()
    const [tags,settags] = useState()
    const { id } = useParams()
    const navigate = useNavigate()
    const selectedTextRef = useRef()

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

    function previewPost(){
      console.log(body)
      return <div>{typeof(body)}</div>
    }

  return (
    <>

            <form className='flex flex-col m-10 p-2 border-[1.5px] rounded' onSubmit={createBugPost}>
                <label className='text-xl font-semibold mx-auto'>Create a Bug Post</label>
                <input className='p-1 m-3 border-[1.5px] border-gray-400 rounded dark:bg-gray-700' placeholder='Title' onChange={e => settitle(e.target.value)}/>
                <div className='flex flex-col m-3 h-48 border-[1.5px] border-gray-400 rounded'>

                  <textarea ref={selectedTextRef} className='p-1 h-full dark:bg-gray-700' placeholder='Body' onChange={e => setbody(e.target.value)} />
                </div>
                <input className='p-1 m-3 border-[1.5px] border-gray-400 rounded dark:bg-gray-700' placeholder='Tags' onChange={e => settags(e.target.value)}/>
                {/* {previewPost()} */}
                <button className='text-white m-3 font-medium mt-7 px-4 py-1 w-fit border outline-none rounded bg-blue-500 hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-600'>Create</button>
            </form>
    </>
  )
}
