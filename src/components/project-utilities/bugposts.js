import { arrayRemove, arrayUnion, collection, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'

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

    var currentTime = new Date()
    console.log(currentTime)
    
return (
    <>

            <div className='flex flex-col'>

                <div className='mt-3 pb-2 px-10 flex flex-row justify-between border-b-[1px] border-borderBlack'>
                    <span className='text-2xl'>Top Bug posts</span>
                    <div className='flex flex-col'>
                        <Link className='w-fit mx-auto bg-blue text-white p-2 hover:bg-darkBlue' to={`/${id}/addbugpost`}>Add bug post</Link>
                        <div className='flex flex-row mt-16 border-[1px] border-borderBlack'>
                            <button className='hover:bg-formColor border-r-[1px] border-borderBlack p-2'>Today</button>
                            <button className='hover:bg-formColor border-r-[1px] border-borderBlack p-2'>This week</button>
                            <button className='hover:bg-formColor p-2'>This month</button>
                        </div>
                    </div>
                </div>
            
                {/* All Bug posts div tag */}

                <div className='flex flex-col'>
                    {!loading && bugpostsdata.map(bug => (                                     // bug object having bug ref and bug data
                        <div className='m-3 p-1 border-b-[1px] border-borderBlack' key={bug.data.title}>
                                                                                          
                            <div className='flex flex-row px-8 py-3 w-full'>                   {/* bug data display element */}
                                <div className='flex flex-col'>
                                    <span className='flex flex-row'>{bug.data.votes.length} <span className='mx-1'>votes</span></span>
                                </div>
                                <div className='ml-4 flex flex-col w-full'>
                                    <Link className='text-darkBlue font-semibold text-lg' to={`/${id}/${bug.data.title}`}>{bug.data.title}</Link>
                                    <div className='flex flex-row justify-between'>
                                        <label className='flex flex-col'>
                                            <span>Tags:</span>
                                            <span className='bg-navBar border border-borderBlack rounded-md px-2 w-fit'>{bug.data.tags}</span>
                                        </label>
                                        <span className='items-end'>{bug.data.creationTime.toDate().toDateString()}</span>
                                    </div>
                                </div>
                                {/* <h1 className='text-3xl'>{bug.data.title}</h1>
                                <h1 className='mx-6'>Votes: {bug.data.votes.length}</h1> */}
                                {/* <button onClick={e => upvote(bug.ref)} className='mx-5'>upvote</button> */}
                            </div>
                            {/* <pre className='px-8 py-1 max-h-48 overflow-hidden text-lg bg-gray-100 dark:bg-gray-700'>{bug.data.body}</pre> */}
                            {/* <h3 className='px-8 py-1 text-sm text-gray-500'>tags: {bug.data.tags}</h3> */}
                        </div>
                    ))}
                </div>
        </div>

    </>
  )
}
