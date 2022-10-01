import { arrayUnion, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'

export default function AddComments({reference}){ // reference = document reference for the bug post

    const [commentBody,setcommentBody] = useState() 
    const {currentuser} = useAuth()

    // firebase custom function to update comment array in database(adding comment)
    async function addComment(e){
        e.preventDefault()

        try{
            await updateDoc(reference,{
                comments: arrayUnion(
                    {   comment: commentBody,
                        uid: currentuser.uid,
                        username: currentuser.displayName,
                        // creationTime: database.getCurrentTimeStamp()
                    }) // adding new comment
            })
        }catch(error){
            console.log(error)
        }
    }

  return (
    // add comment form 
    <form className='flex flex-row' onSubmit={addComment}>
        <textarea onChange={e => setcommentBody(e.target.value)} className='border-[1px] border-borderBlack m-1 p-1 h-12 w-4/5 dark:text-black dark:bg-gray-400'/>
        <button className=' flex bg-blue hover:bg-darkBlue text-white w-fit p-1 h-fit items-center justify-center'>Add</button>
    </form>
  )
}
