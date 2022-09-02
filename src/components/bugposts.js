import { async } from '@firebase/util'
import { arrayRemove, collection, getDocs, orderBy, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { database } from '../firebase'
import AddComments from './addcomments'
import Answers from './answers'
import NavBar from './navbar'

export default function BugPosts() {

    const [bugpostsdata,setbugpostsdata] = useState([])
    const [loading,setloading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        
        async function fetchBugPosts(){
            await getDocs(collection(database.projects,id,'data'))
            .then(files => {
                if(files !== undefined){
                    setbugpostsdata(files.docs.map(file => ({data:file.data(),ref: file.ref})))
                    setloading(false)
                }
            })

        }

        fetchBugPosts()

    },[])

    async function deleteComment(commentDoc,bugDocRef){
        try{
            await updateDoc(bugDocRef,{
                comments: arrayRemove(commentDoc)
            })
        }catch(error){
            console.log(error)
        }
    }


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

        <div className='float-right w-4/5 mt-16'>
            <div className='flex flex-col'>
            
            <div className='flex flex-col'>
                {!loading && bugpostsdata.map(bug => (
                    <div className='m-3 p-1 border-[1.5px] rounded' key={bug.data.title}>
                        <h1 className='text-3xl px-8 py-3'>{bug.data.title}</h1>
                        <h2 className='px-8 py-1 text-xl'>{bug.data.body}</h2>
                        <h3 className='px-8 py-1 text-sm text-gray-500'>tags: {bug.data.tags}</h3>
                        <div className='flex flex-col mx-8 my-4 border rounded '>
                            comments: {bug.data.comments.map(item => <div key={item.comment} className='flex flex-row'>
                                <h4>{item.comment}</h4>
                                <h4 className='ml-2 text-sm text-gray-400'>{item.uid}</h4>
                                <button onClick={e => deleteComment(item,bug.ref)} className='mx-2 text-sm text-gray-700'>delete</button>
                                <hr /></div>)}
                            <AddComments reference={bug.ref} />
                        </div>
                        <h4>Answers</h4>
                        <hr/>
                        <div className='p-1 bg-yellow-50'>{bug.data.answers.map(answer => <h4 key={answer}>{answer}</h4>)}</div>
                        <h4>Add an Answer</h4>
                        <Answers reference={bug.ref}/>
                    </div>
                ))}
            </div>
        </div>

            {/* {!loading && (
                <div>
                    <AddComments projectId={id} setcommentBody={setcommentBody} />
                </div>
            )} */}
    </div>
    </>
  )
}
