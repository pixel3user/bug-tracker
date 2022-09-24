import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'
export default function Login() {
    
    const { login } = useAuth()
    const navigate = useNavigate()

    async function submitloginhandler(e){                       // login handler
        e.preventDefault()
    
        try{
          await login()                                         // github login function from useAuth context component
          navigate('/create-account')                           // redirecting to create account page after login
        }catch(error){
          console.log("Error bc",error)
        }
      }



  return (

                                                                // login form


    <div className="flex flex-col items-center justify-center sm:h-screen bg-dashboard-image">               
      <div className='flex flex-col mx-auto sm:border-[1px] sm:px-32 py-12 sm:rounded-xl sm:border-gray-300'>
        <form className='flex flex-col' onSubmit={submitloginhandler}>
            <img src='https://firebasestorage.googleapis.com/v0/b/test-project-42b86.appspot.com/o/logo.webp?alt=media&token=6509fcd6-c2b3-4324-9db5-927d3e8f9a39' className='object-scale-down h-12' />
            <h2 className='mx-auto text-xl font-semibold'>Login</h2>
            
            <button className='text-white font-medium mt-7 px-4 py-2 w-fit mx-auto border outline-none rounded bg-blue-500 hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-600'>
                Login using github
            </button>
        </form>
      </div>
      
    </div>
  )
}
