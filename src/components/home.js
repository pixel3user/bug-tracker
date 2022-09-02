import { arrayRemove, arrayUnion, collection, getDoc, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { database } from '../firebase'
import NavBar from './navbar'

export default function Home() {

  const {currentuser} = useAuth()
  const [requestData,setrequestData] = useState([])

  useEffect(() => {
    setrequestData([])
    async function fetchPublicData(){
      const docSnap = await getDoc(database.public(currentuser.uid))
      setrequestData(docSnap.data().requests)
    }

    fetchPublicData()
  },[])

  async function grantAccess(doc){
    try{
      // const q = query(database.projectsGroup('info'),where('name','==',doc.project))
      await updateDoc(database.project(doc.project),{
        participants: arrayUnion(doc.from)
      }).then(async () => {
        try{
          await updateDoc(database.public(currentuser.uid),{
            requests: arrayRemove(doc)
          })
          setrequestData(requestData.filter(item => item != doc))
        }catch(error){
          console.log(error)
        }
      })
    }catch(error){
      console.log(error)
    }
  }

  // requestData.forEach(doc => console.log(doc.project))
  // console.log(requestData)

  return (
    <>
        <NavBar />

          <aside className='w-1/5 fixed mt-16 left-0 top-0 h-screen border-r-[1.5px]'>
            <div className='float-right flex flex-col mt-5'>
              <Link to={'/home'} className='flex flex-row bg-gray-200 rounded-l-lg mb-2 border-r-[3px] border-green-500'>
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

          <div className='flex flex-col float-right w-4/5 mt-16'>
              <Link className='mx-auto' to={'/create-project'}>Create a new project</Link>
              
              <Link className='mx-auto' to={'/my-projects'}>My Projects</Link>

              <div className='mx-auto m-4 p-1 bg-gray-100 border-[1.5px] rounded'>
                Access Requests
                <hr />
                {requestData.map(doc => (
                  <div key={doc.from}>
                    <Link to={`/profile/${doc.from}`}>Username: {doc.from}</Link>
                    <h1>Project: {doc.project}</h1>
                    <button onClick={e => grantAccess(doc)} className='bg-green-400 p-1 rounded-lg'>Grant access</button>
                  </div>
                ))}
          </div>
          </div>

    </>
  )
}
