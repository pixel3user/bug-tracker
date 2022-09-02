import { doc, getDoc, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { database } from '../firebase'
import NavBar from './navbar'

export default function OtherProfile() {
    const [profileData , setprofileData] = useState()
    const [error, seterror] = useState('')
    const [loading , setloading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        async function fetchProfileData(){
            const ref = database.user(id)
            try{
                const data = await getDoc(ref)
                if(data.exists()){
                    setprofileData(data.data())
                    setloading(false)
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
        <NavBar />

        <aside className='w-1/5 fixed mt-16 left-0 top-0 h-screen border-r-[1.5px]'>
            <div className='float-right flex flex-col mt-5'>
              <Link to={'/home'} className='flex flex-row mb-2'>
                <h1 className='mr-20 p-2 text-md'>Home</h1>
              </Link>
              <Link to={'/my-projects'} className='flex flex-row mb-2'>
                <h1 className='mr-20 p-2 text-md'>My Project</h1>
              </Link>
              <Link to={'/create-project'} className='flex flex-row mb-2'>
                <h1 className='mr-20 p-2 text-md'>Create Project</h1>
              </Link>
            </div>
            <div></div>
          </aside>
          
        <div className='flex flex-col p-3 float-right w-4/5 mt-16'>
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
