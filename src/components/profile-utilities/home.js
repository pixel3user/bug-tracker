import { arrayRemove, arrayUnion, getDoc, updateDoc} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'

export default function Home() {

  const {currentuser} = useAuth()
  const [requestData,setrequestData] = useState([])

  useEffect(() => {                                                           // fetch pending project access requests.
    setrequestData([])
    async function fetchPublicData(){
      const docSnap = await getDoc(database.public(currentuser.uid))          // fetchs requests for the current user.
      setrequestData(docSnap.data().requests)
    }

    fetchPublicData()

  },[])
console.log(currentuser)
  async function grantAccess(doc){                                            // accepting requests
    try{
      await updateDoc(database.project(doc.project),{                         // update participants of projects
        participants: arrayUnion(doc.from)
      }).then(async () => {
        try{
          await updateDoc(database.public(currentuser.uid),{                  // removing request if accepted
            requests: arrayRemove(doc)
          })
          setrequestData(requestData.filter(item => item != doc))             // filter new requests in list
        }catch(error){
          console.log(error)
        }
      })
    }catch(error){
      console.log(error)
    }
  }


  return (
    <>
              <Link className='mx-auto' to={'/create-project'}>Create a new project</Link>
              
              <Link className='mx-auto' to={'/my-projects'}>My Projects</Link>

              <div className='mx-auto m-4 p-1 bg-gray-100 border-[1.5px] rounded dark:text-black'>                      {/* Requests list */}
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

    </>
  )
}
