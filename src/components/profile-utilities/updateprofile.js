import { updateDoc } from 'firebase/firestore'
import { getDownloadURL, uploadBytes } from 'firebase/storage'
import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'

export default function UpdateProfile() {
    const usernameRef = useRef()
    const [file, setfile] = useState(null)
    const { currentuser , setCurrentUser } = useAuth()

    function changeProfilePic(e){                                                          // change profile pic function
        e.preventDefault()
        console.log(file.name)
        uploadBytes(database.profilePicStorage(file.name),file).then(snapshot => {         // uploading new profile pic
            getDownloadURL(database.profilePicStorage(file.name)).then(async (url) => {    // get new profile pic download url
                try{
                    await updateDoc(database.user(currentuser.uid),{                       // update user document with profilepic url
                        photoURL: url
                    })
                    setCurrentUser(null,url)
                }catch(error){
                    console.log(error)
                }
            })
        })
    }


  return (
    <>
        <div className='flex flex-col m-3 items-center h-screen'>
            <h1 className='my-3 text-xl font-bold'>Update your Profile</h1>
            <form className='flex flex-col border p-3 rounded'>
                {/* <label>
                    <input ref={usernameRef} className='border-[1.5px] px-2' placeholder='New Username'/>
                    <button onClick={changeUsername} className='bg-blue-300 rounded m-2 p-1'>Update Username</button>
                </label> */}

                <label>
                    <input type='file' onChange={e => { setfile(e.target.files[0])}} className='border-[1.5px] px-2'/>
                    <button onClick={changeProfilePic} className='bg-blue text-white hover:bg-darkBlue rounded m-2 p-1'>Update Profile Pic</button>
                </label>
            </form>
        </div>
    </>
  )
}
