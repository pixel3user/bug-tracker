import { arrayUnion, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { database } from '../firebase'

export default function({projectRef}) {
    
    const [participantUsername,setparticipantUsername] = useState()


    async function submitHandler(e){
        e.preventDefault()
        const q = query(database.users,where('username','==',participantUsername))
        await getDocs(q).then(existingFiles => {

            try{
                updateDoc(projectRef,{
                    participants: arrayUnion(existingFiles.docs[0].data().uid)
                })
            }catch(error){
                console.log(error)
            }
        })
    }
  return (
    <form className='flex flex-row' onSubmit={submitHandler}>
        <input onChange={e => setparticipantUsername(e.target.value)} className='border-[1.5px]' placeholder='add participants'/>
        <button className='bg-blue-300'>Add</button>
    </form>
  )
}
