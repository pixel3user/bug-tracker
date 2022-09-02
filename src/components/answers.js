import { arrayUnion, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'

export default function Answers({reference}) {

    const [answer, setanswer] = useState()

    async function addAnswer(e){
        e.preventDefault()
        try{
            await updateDoc(reference,{
                answers: arrayUnion(answer)
            })
        }catch(error){
            console.log(error)
        }
    }

  return (
    <form className='flex flex-col' onSubmit={addAnswer}>
        <input onChange={e => setanswer(e.target.value)} className='border-[1.5px]'/>
        <button className='bg-blue-300'>Create</button>
    </form>
  )
}
