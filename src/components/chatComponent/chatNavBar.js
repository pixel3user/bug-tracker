import React from 'react'
import { useAuth } from '../../contexts/authContext'

export default function ChatNavBar() {
    const {currentuser} = useAuth()
  return (
    <div className='navbar'>
      <div className="flex flex-row p-3">
        <img className='w-10 h-10 rounded-full object-cover' src={currentuser?.photoURL} alt="pic" />
        <span className='mx-4'>{currentuser?.displayName}</span>
      </div>
    </div>
  )
}
