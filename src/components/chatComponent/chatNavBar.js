import React from 'react'
import { useAuth } from '../../contexts/authContext'

export default function ChatNavBar() {
    const {currentuser} = useAuth()
  return (
    <div className='navbar'>
      <div className="flex flex-row p-3">
        <img width={"48px"} height={"48px"} src={currentuser.photoURL} alt="" />
        <span className='mx-4'>{currentuser.displayName}</span>
      </div>
    </div>
  )
}
