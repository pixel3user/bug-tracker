import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

export default function PrivateRoute({children}) {
    
    const { currentuser } = useAuth()

  return currentuser ? children : <Navigate to='/login' />
}
