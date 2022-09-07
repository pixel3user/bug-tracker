import { addDoc, collection } from 'firebase/firestore'
import React, { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { database } from '../../firebase'
import NavBar from '../navbar'

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

    // function setTextToCode(e){
    //   e.preventDefault()
    //   let cursorStart = selectedTextRef.selectionStart
    //   let cursorEnd = selectedTextRef.selectionEnd
    //   console.log(cursorStart,cursorEnd)
    //   // console.log(selectedTextRef.current.value.substring(cursorStart,cursorEnd))
    // }

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
                <div className='flex flex-col m-3 h-48 border-[1.5px] border-gray-400 rounded'>
                  {/* <div className='flex flex-row bg-gray-200'>
                    <button onClick={setTextToCode} className='my-1 mx-4 bg-gray-300 rounded-lg shadow-lg'>code</button>
                  </div> */}
                  <textarea ref={selectedTextRef} className='p-1 h-full' placeholder='Body' onChange={e => setbody(e.target.value)}/>
                </div>
                <input className='p-1 m-3 border-[1.5px] border-gray-400 rounded' placeholder='Tags' onChange={e => settags(e.target.value)}/>
                <button className='text-white m-3 font-medium mt-7 px-4 py-1 w-fit border outline-none rounded bg-blue-500 hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-600'>Create</button>
            </form>
        </div>
    </>
  )
}
