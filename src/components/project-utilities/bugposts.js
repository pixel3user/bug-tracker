import { arrayRemove, arrayUnion, collection, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'
import NavBar from '../navbar'

export default function BugPosts() {

    const [bugpostsdata,setbugpostsdata] = useState([])
    const [loading,setloading] = useState(true)
    const { id } = useParams()
    const {currentuser} = useAuth()

    useEffect(() => {                                                                   // fetch bug posts
        async function fetchBugPosts(){
            const q = query(collection(database.projects,id,'data'),orderBy('votes','desc'))  // bug posts ordeby votes in decending order
            await getDocs(q)
            .then(files => {
                if(files !== undefined){
                    setbugpostsdata(files.docs.map(file => ({data:file.data(),ref: file.ref})))
                    setloading(false)
                }
            })

        }

        fetchBugPosts()

    },[])


    
return (
    <>

            <div className='flex flex-col'>
            
            {/* All Bug posts div tag */}

            <div className='flex flex-col'>
                {!loading && bugpostsdata.map(bug => (                                     // bug object having bug ref and bug data
                    <Link to={`/${id}/${bug.data.title}`} className='m-3 p-1 border-[1.5px] rounded' key={bug.data.title}>
                                                                                           
                        <div className='flex flex-row px-8 py-3 w-full'>                   {/* bug data display element */}
                            <h1 className='text-3xl'>{bug.data.title}</h1>
                            <h1 className='mx-6'>Votes: {bug.data.votes.length}</h1>
                            {/* <button onClick={e => upvote(bug.ref)} className='mx-5'>upvote</button> */}
                        </div>
                        {/* <pre className='px-8 py-1 max-h-48 overflow-hidden text-lg bg-gray-100 dark:bg-gray-700'>{bug.data.body}</pre> */}
                        <h3 className='px-8 py-1 text-sm text-gray-500'>tags: {bug.data.tags}</h3>
                    </Link>
                ))}
            </div>
        </div>

    </>
  )
}
