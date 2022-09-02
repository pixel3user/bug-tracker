import { arrayUnion, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuth } from '../../contexts/authContext'

export default function AddComments({reference}){ // reference = document reference for the bug post

    const [commentBody,setcommentBody] = useState() 
    const {currentuser} = useAuth()

    // firebase custom function to update comment array in database(adding comment)
    async function addComment(e){
        e.preventDefault()

        try{
            await updateDoc(reference,{
                comments: arrayUnion({comment: commentBody,uid: currentuser.uid}) // adding new comment
            })
        }catch(error){
            console.log(error)
        }
    }

  return (
    // add comment form 
    <form className='flex flex-row' onSubmit={addComment}>
        <input onChange={e => setcommentBody(e.target.value)} className='border-[1.5px]'/>
        <button className='bg-blue-300'>Add Comment</button>
    </form>
  )
}
