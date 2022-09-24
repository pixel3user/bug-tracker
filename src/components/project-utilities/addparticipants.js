import { arrayUnion, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { database } from '../../firebase'

export default function({projectRef}) {
    
    const [participantUsername,setparticipantUsername] = useState()
    const [showForm,setshowForm] = useState(false)


    async function submitHandler(e){
        e.preventDefault()
        if(participantUsername == undefined){
            setshowForm(false)
            return
        }
        const q = query(database.users,where('username','==',participantUsername))
        await getDocs(q).then(existingFiles => {

            try{
                updateDoc(projectRef,{
                    participants: arrayUnion(existingFiles.docs[0].data().uid)
                })
            }catch(error){
                console.log(error)
                setshowForm(false)
            }
        })

        setshowForm(false)
        
    }
  return (
    <>
        <div onClick={() => setshowForm(true)} className='bg-gray-100 hover:bg-gray-200 dark:bg-gray-300 shadow-lg h-fit rounded-xl p-1 m-5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100'>
            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M36.5 28v-6.5H30v-3h6.5V12h3v6.5H46v3h-6.5V28ZM18 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM2 40v-4.7q0-1.75.9-3.175Q3.8 30.7 5.4 30q3.75-1.65 6.675-2.325Q15 27 18 27t5.925.675Q26.85 28.35 30.55 30q1.6.75 2.525 2.15.925 1.4.925 3.15V40Zm3-3h26v-1.7q0-.8-.4-1.525-.4-.725-1.25-1.075-3.5-1.7-5.975-2.2Q20.9 30 18 30t-5.375.525Q10.15 31.05 6.6 32.7q-.75.35-1.175 1.075Q5 34.5 5 35.3Zm13-16.05q1.95 0 3.225-1.275Q22.5 18.4 22.5 16.45q0-1.95-1.275-3.225Q19.95 11.95 18 11.95q-1.95 0-3.225 1.275Q13.5 14.5 13.5 16.45q0 1.95 1.275 3.225Q16.05 20.95 18 20.95Zm0-4.5ZM18 30Z"/></svg>
            <span className='mx-auto text-sm dark:text-black'>Add participant</span>
        </div>

        {showForm && (
            <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-[1.5px] border-gray-400 bg-gray-200 dark:border-white p-10 rounded-xl'>
                <form className='flex flex-row' onSubmit={submitHandler}>
                    <input onChange={e => setparticipantUsername(e.target.value)} className='border-[1.5px] dark:text-black' placeholder='add participants'/>
                    <button className='bg-blue-300 mx-2'>Add</button>
                    <button onClick={() => setshowForm(false)} className='bg-red-300 mx-2'>Close</button>
                </form>
            </div>
        )}
    </>
  )
}
