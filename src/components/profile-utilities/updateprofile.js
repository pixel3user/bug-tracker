import { query, updateDoc } from 'firebase/firestore'
import { getDownloadURL, uploadBytes } from 'firebase/storage'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'
import NavBar from '../navbar'

export default function UpdateProfile() {
    const usernameRef = useRef()
    const [file, setfile] = useState(null)
    const { currentuser } = useAuth()

    async function changeUsername(e){                                                       // change username function
        e.preventDefault()
        
        try{
            await updateDoc(database.user(currentuser.uid),{                               // update info collection doc
                username: usernameRef.current.value
            })
        }catch(error){
            console.log(error)
        }
    }

    function changeProfilePic(e){                                                          // change profile pic function
        e.preventDefault()
        console.log(file.name)
        uploadBytes(database.profilePicStorage(file.name),file).then(snapshot => {         // uploading new profile pic
            getDownloadURL(database.profilePicStorage(file.name)).then(async (url) => {    // get new profile pic download url
                try{
                    await updateDoc(database.user(currentuser.uid),{                       // update user document with profilepic url
                        profilePic: url
                    })
                }catch(error){
                    console.log(error)
                }
            })
        })
    }

  return (
    <>
        <NavBar />
        <div className='flex flex-col m-3 items-center'>
            <h1 className='my-3 text-xl font-bold'>Update your Profile</h1>
            <form className='flex flex-col border p-3 rounded'>
                <label>
                    <input ref={usernameRef} className='border-[1.5px] px-2' placeholder='New Username'/>
                    <button onClick={changeUsername} className='bg-blue-300 rounded m-2 p-1'>Update Username</button>
                </label>

                <label>
                    <input type='file' onChange={e => { setfile(e.target.files[0])}} className='border-[1.5px] px-2'/>
                    <button onClick={changeProfilePic} className='bg-blue-300 rounded m-2 p-1'>Update Profile Pic</button>
                </label>
            </form>
        </div>
    </>
  )
}
