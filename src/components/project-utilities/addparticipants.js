import { arrayUnion, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { database } from '../../firebase'

export default function({projectRef}) {
    
    const [participantUsername,setparticipantUsername] = useState()
    const [showForm,setshowForm] = useState(false)
    const [searchResultUser, setsearchResultUser] = useState()
    const [selectedParticipants, setselectedParticipants] = useState([])

    async function submitHandler(e){
        e.preventDefault()
        if(participantUsername == undefined){
            setshowForm(false)
            return
        }
        // const q = query(database.users,where('username','==',participantUsername))
        // await getDocs(q).then(existingFiles => {

        //     try{
        //         updateDoc(projectRef,{
        //             participants: arrayUnion({uid:existingFiles.docs[0].data().uid,username:participantUsername})
        //         })
        //     }catch(error){
        //         console.log(error)
        //         setshowForm(false)
        //     }
        // })
        try{
            updateDoc(projectRef,{
                participants: arrayUnion(...selectedParticipants)
            })
        }catch(error){
            console.log(error)
            setshowForm(false)
        }
        setselectedParticipants([])
        setsearchResultUser()
        setshowForm(false)
        
    }

    useEffect(() => {
        async function search(){
            if(!participantUsername){
                return
            }
            setsearchResultUser([])
            const qUser = query(database.users,where('username','==',participantUsername))
            await getDocs(qUser).then(existingFiles => {
                if(existingFiles.docs[0] != undefined){
                    setsearchResultUser(existingFiles.docs[0].data())
                }
            }
            )
          }

          search()
    },[participantUsername])
    console.log(...selectedParticipants)
  return (
    <>
        <div onClick={() => setshowForm(true)} className='cursor-pointer bg-navBar hover:bg-borderBlack dark:bg-gray-300 shadow-lg h-fit rounded-xl p-1 m-5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100'>
            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M36.5 28v-6.5H30v-3h6.5V12h3v6.5H46v3h-6.5V28ZM18 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM2 40v-4.7q0-1.75.9-3.175Q3.8 30.7 5.4 30q3.75-1.65 6.675-2.325Q15 27 18 27t5.925.675Q26.85 28.35 30.55 30q1.6.75 2.525 2.15.925 1.4.925 3.15V40Zm3-3h26v-1.7q0-.8-.4-1.525-.4-.725-1.25-1.075-3.5-1.7-5.975-2.2Q20.9 30 18 30t-5.375.525Q10.15 31.05 6.6 32.7q-.75.35-1.175 1.075Q5 34.5 5 35.3Zm13-16.05q1.95 0 3.225-1.275Q22.5 18.4 22.5 16.45q0-1.95-1.275-3.225Q19.95 11.95 18 11.95q-1.95 0-3.225 1.275Q13.5 14.5 13.5 16.45q0 1.95 1.275 3.225Q16.05 20.95 18 20.95Zm0-4.5ZM18 30Z"/></svg>
            <span className='mx-auto text-sm dark:text-black'>Add participant</span>
        </div>

        {showForm && (
            <div className='fixed inset-0 bg-borderBlack bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
                <div className='w-1/2 h-4/6 border-[1px] border-borderBlack bg-formColor dark:border-white p-10 rounded-xl'>
                    <form className='flex flex-row' onSubmit={submitHandler}>
                        <input onChange={e => setparticipantUsername(e.target.value)} className='border-[1px] w-full border-borderBlack rounded-md p-1 dark:text-black' placeholder='username'/>
                        {searchResultUser && (
                            <div onClick={() => setselectedParticipants(prev => [...prev,{uid:searchResultUser.uid,username:searchResultUser.username}])} href={`/profile/${searchResultUser.uid}`} className='hover:cursor-pointer fixed text-black mt-9 border-[1.5px] border-black rounded'>
                                <div className='flex flex-row'>
                                    <img width="36px" height="36px" src={`${searchResultUser.profilePic}`} />
                                    <span>{searchResultUser.username}</span>
                                </div>
                            </div>
                        )}
                        <button className='bg-blue px-1 text-white font-semibold text-md rounded-sm mx-2 hover:bg-darkBlue'>Add</button>
                        <button onClick={() => setshowForm(false)} className='bg-red px-1 text-white font-semibold text-md rounded-sm mx-2 hover:bg-darkRed'>Close</button>
                    </form>
                    <div className='flex flex-row mt-20'>
                        {selectedParticipants && (
                            selectedParticipants.map(user => (
                                <div key={`${user.uid}`} className='flex flex-row p-1 mx-1'>
                                    <a target='_blank' className='text-blue' href={`/profile/${user.uid}`}>{user.username}</a>
                                    <button onClick={() => setselectedParticipants(prev => prev.filter(doc => doc != user))} className='mx-1'>
                                        <img className='w-3 h-3' src='/images/cancel.png' />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        )}
    </>
  )
}
