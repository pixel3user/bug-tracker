import React, { useEffect } from 'react'
import NavBar from '../navbar'

export default function Dashboard() {                               // main welcome page
  
  
  return (
    <>
        <article className='bg-blue-400 h-screen w-full bg-dashboard-image'>
          <div className='p-3 flex flex-col justify-center items-center'>
            <div className='mt-24'>
              <h1 className='py-2 text-white font-bold text-3xl'>Make your app free of bugs</h1>
              <p className='pt-2 text-white font-bold text-xl'>
                Peepo is a bug tracker platform that helps you track all your app bugs at one place.<br />
                Now tracking your bugs are as easy as you posting your last post on twitter.
                </p>
            </div>
          </div>
        </article>

    </>
  )
}
