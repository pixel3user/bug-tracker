import { getDoc, setDoc} from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'

// creating username page ,,, adding user to database
export default function CreateAccount() {

    const navigate = useNavigate() 
    const usernameRef = useRef()
    const [formvisibility,setformvisibility] = useState(false)
    const { currentuser,setCurrentUser } = useAuth()

    async function addNewUser(e){                                     // firebase custom function to add new user to database
        e.preventDefault()
        
        try{
          await setDoc(database.user(currentuser.uid),{               // add user doc to database users collection
            username: usernameRef.current.value,
            uid: currentuser.uid,
            email: currentuser.email,
            photoURL: currentuser.photoURL,
            todo: []
          })
          await setDoc(database.public(currentuser.uid),{             // adding user to database in public collection
            uid: currentuser.uid,
            requests: []
          })

          await setDoc(database.userChats(currentuser.uid), {});
          
          setCurrentUser(usernameRef.current.value,currentuser.photoURL)

        }catch(error){
          console.log(error)
        }

        navigate('/home')                                             // redirecting to home page after creating user
      }

    useEffect( () => {
        async function fetch(){
          // const ref = database.user(currentuser.uid)
          // const docSnap = await getDoc(ref)                           // checking if existing user database exists in users collection
          // if(docSnap.exists()){
          //   if(!docSnap.data().username){
          //     setformvisibility(true)
          //   }else{
          //     await setCurrentUser(docSnap.data().username,docSnap.data().photoURL)
          //     navigate('/home')
          //   }
          // }else{
          //   setformvisibility(true)
          // }
          if(currentuser.displayName === null){
            setformvisibility(true)
          }
          else{
            navigate('/home')
          }
          
        }

        fetch()
    })

  return (
    // username input form
    <div className="flex flex-col items-center justify-center sm:h-screen">
      {formvisibility && (
          <div className='flex flex-col mx-auto sm:border-[1px] sm:px-32 py-12 sm:rounded-xl sm:border-gray-300'>
          <form className='flex flex-col' onSubmit={addNewUser}>
              <div className='mx-auto flex flex-row my-5'>
                <span className='font-light text-3xl'>Bug</span>
                <span className='font-bold text-3xl'>Tracker</span>
              </div>
              <h2 className='mx-auto text-xl font-semibold'>Create a Username</h2>
              <input className=' mt-4 bg-gray-50 px-2.5 py-1.5 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' ref={usernameRef} />
              <button className='font-medium mt-7 text-white px-4 py-2 w-fit mx-auto border outline-none rounded bg-blue hover:bg-darkBlue hover:shadow-sm hover:shadow-blue-600'>
                  Create
              </button>
          </form>
        </div>
      )}
    </div>
  )
}
