import { getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'
import NavBar from '../navbar'

export default function Profile() {
    const { currentuser } = useAuth()
    const [profileData , setprofileData] = useState()
    const [error, seterror] = useState('')
    const [loading , setloading] = useState(true)

    useEffect(() => {                                                           // fetch currentuser profile data
        async function fetchProfileData(){
            const ref = database.user(currentuser.uid)
            try{
                const data = await getDoc(ref)                                  // fetch data from user collection 
                if(data.exists()){
                    setprofileData(data.data())                                 // add data to profileData state
                    setloading(false)                                           // set loading to false
                }else{
                    seterror('Error cannot fetch data from server!')
                }
            }catch(error){
                console.log(error)
            }
        }

        fetchProfileData()
    },[])

  return (
    <>
          
        <div className='flex flex-col p-3 float-right'>
            <div className='flex flex-row border p-2 rounded'>
                <span>{error}</span>
                {!loading && <img src={profileData.profilePic} className='w-24 h-24 m-3 object-contain' />}
                {!loading && <h2 className='mx-3'>Username: {profileData.username}</h2>}
                {!loading && <h2 className='mx-3'>Email: {profileData.email}</h2>}
                {!loading && <Link to={'/update-profile'} className='bg-green-400 rounded-lg p-1 h-fit'>Update profile</Link>}
            </div>
        </div>
    </>
  )
}
