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
      <div className='flex flex-col mx-auto sm:border-[1px] border-navBar bg-navBar sm:px-32 py-12 sm:rounded-xl sm:border-gray-300 dark:bg-black'>
        <form className='flex flex-col' onSubmit={submitloginhandler}>

            <div className='mx-auto flex flex-row my-5'>
              <span className='font-light text-3xl'>Bug</span>
              <span className='font-bold text-3xl'>Tracker</span>
            </div>

            <h2 className='mx-auto text-xl font-semibold'>Login</h2>
            
            <button className=' font-medium mt-7 text-white px-4 py-2 w-fit mx-auto border outline-none rounded bg-blue hover:bg-darkBlue hover:shadow-sm hover:shadow-blue-600'>
                Login using github
            </button>
        </form>
      </div>
      
    </div>
  )
}
