import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'


export default function Profile() {
    const { currentuser } = useAuth()
  return (
    <>
          
        <div className='flex flex-col p-3 float-right'>
            <div className='flex flex-row border p-2 rounded'>
                <span>{!currentuser && "Error loading profile"}</span>
                <img src={currentuser.photoURL} className='w-24 h-24 m-3 object-contain' />
                <h2 className='mx-3'>Username: {currentuser.displayName}</h2>
                <h2 className='mx-3'>Email: {currentuser.email}</h2>
                <Link to={'/update-profile'} className='bg-navBarBorder rounded-lg p-1 h-fit'>Update profile</Link>
            </div>
        </div>
    </>
  )
}
