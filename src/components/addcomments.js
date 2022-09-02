import { arrayUnion, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuth } from '../contexts/authContext'

export default function AddComments({reference}){

    const [commentBody,setcommentBody] = useState()
    const {currentuser} = useAuth()

    async function addComment(e){
        e.preventDefault()
        try{
            await updateDoc(reference,{
                comments: arrayUnion({comment: commentBody,uid: currentuser.uid})
            })
        }catch(error){
            console.log(error)
        }
    }

  return (
    <form className='flex flex-row' onSubmit={addComment}>
        <input onChange={e => setcommentBody(e.target.value)} className='border-[1.5px]'/>
        <button className='bg-blue-300'>Add Comment</button>
    </form>
  )
}
