import { arrayUnion, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'

export default function Answers({reference}) { // reference = document reference for the bug post

    const [answer, setanswer] = useState()

    // firebase custom function to update answers array in database(adding answer)
    async function addAnswer(e){
        e.preventDefault()

        try{
            await updateDoc(reference,{
                answers: arrayUnion(answer) // adding new answer #work needed right here ... make an object with uid
            })
        }catch(error){
            console.log(error)
        }
    }

  return (
    // add answer form 
    <form className='flex flex-col' onSubmit={addAnswer}>
        <input onChange={e => setanswer(e.target.value)} className='border-[1.5px]'/>
        <button className='bg-blue-300'>Create</button>
    </form>
  )
}
