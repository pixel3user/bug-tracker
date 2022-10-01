import { getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../../firebase'

export default function OtherProfile() {                                                  // other user profile page
    const [profileData , setprofileData] = useState()
    const [error, seterror] = useState('')
    const [loading , setloading] = useState(true)
    const {id} = useParams()

    useEffect(() => {                                                                    // fetch any user id
        async function fetchProfileData(){
            const ref = database.user(id)                                                // ref to user id
            try{
                const data = await getDoc(ref)                            
                if(data.exists()){
                    setprofileData(data.data())                                          // add data to profileData state
                    setloading(false)                                                    // stops loading
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
            </div>
        </div>
    </>
  )
}
