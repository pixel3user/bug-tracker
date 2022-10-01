import { arrayUnion, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'
import TextAreaBody from '../textEditor'

export default function Answers({reference}) { // reference = document reference for the bug post

    const [answer, setanswer] = useState()
    const {currentuser,data} = useAuth()

    // firebase custom function to update answers array in database(adding answer)
    async function addAnswer(e){
        e.preventDefault()

        try{
            await updateDoc(reference,{
                answers: arrayUnion(
                    {   answer:localStorage.getItem('content'),
                        user: { uid: currentuser.uid , username: data.username},
                        votes: [],
                        // creationTime: database.getCurrentTimeStamp()
                    }) // adding new answer #work needed right here ... make an object with uid
            })
        }catch(error){
            console.log(error)
        }
    }

  return (
    // add answer form 
    <form className='flex flex-col border-[1px] border-borderBlack' onSubmit={addAnswer}>
        <TextAreaBody showButtons={true} />
        {/* <input onChange={e => setanswer(e.target.value)} className='border-[1.5px] dark:text-black dark:bg-gray-400'/> */}
        <button className='text-white m-3 font-medium mt-7 px-4 py-1 w-fit border outline-none rounded bg-blue hover:bg-darkBlue hover:shadow-sm hover:shadow-blue-600'>Add answer</button>
    </form>
  )
}
