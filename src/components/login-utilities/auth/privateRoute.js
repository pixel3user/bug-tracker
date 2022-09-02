import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'

export default function PrivateRoute({children}) {            // function to check if user is logged in to access only logged in pages.
    
    const { currentuser } = useAuth()

  return currentuser ? children : <Navigate to='/login' />    // redirecting to login if not logged in.
}
