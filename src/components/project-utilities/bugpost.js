import { arrayRemove, arrayUnion, collection, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'
import AddComments from '../bug-components/addcomments'
import Answers from '../bug-components/answers'
import TextAreaBody from '../textEditor'

export default function BugPost() {

    const [bugpostsdata,setbugpostsdata] = useState([])
    const [loading,setloading] = useState(true)
    const { id,bugid } = useParams()
    const {currentuser} = useAuth()

    useEffect(() => {                                                                   // fetch bug posts
        async function fetchBugPosts(){
            const q = query(collection(database.projects,id,'data'),where('title','==',bugid))  // bug posts ordeby votes in decending order
            await getDocs(q)
            .then(files => {
                if(files !== undefined){
                    // setbugpostsdata(files.docs.map(file => ({data:file.data(),ref: file.ref})))
                    setbugpostsdata({data: files.docs[0].data(), ref: files.docs[0].ref})
                    setloading(false)
                }
            })

        }

        fetchBugPosts()

    },[])

    async function deleteComment(commentDoc,bugDocRef){                                 // remove comment function
        try{
            await updateDoc(bugDocRef,{
                comments: arrayRemove(commentDoc)
            })
        }catch(error){
            console.log(error)
        }
    }

    async function upvote(bugDocRef){                                                   // adding new upvote user id
        try{
            await updateDoc(bugDocRef,{
                votes: arrayUnion(currentuser.uid)
            })
        }catch(error){
            console.log(error)
        }
    }

return (
    <>

            <div className='flex flex-col'>
            
            {/* All Bug posts div tag */}

            <div className='flex flex-col'>
                {!loading && (
                  <>
                    <div className='py-4 px-6 flex flex-col border-b-[1px] border-borderBlack'>
                      <span className='text-2xl'>{bugpostsdata.data.title}</span>
                      <span className='text-sm text-borderBlack'>{bugpostsdata.data.creationTime.toDate().toDateString()}</span>
                    </div>
                    <div className='flex flex-row'>
                      <div className='flex flex-col'>
                        <img onClick={e => upvote(bugpostsdata.ref)} className='w-12 h-12 hover:cursor-pointer' src='/images/arrowup.svg' />
                        <span className='mx-auto'>{bugpostsdata.data.votes.length}</span>
                        <img className='w-12 h-12' src='/images/arrowdown.svg' />
                      </div>
                      <div className='flex flex-col w-5/6 m-3 p-1 border-[TEST] border-borderBlack' key={bugpostsdata.data.title}>
                                                                                        
                        <div className='flex flex-row px-8 py-3 w-full'>                   {/* bug data display element */}
                            {/* <button onClick={e => upvote(bugpostsdata.ref)} className='mx-5'>upvote</button> */}
                        </div>
                        <pre className='px-8 py-1 overflow-auto text-lg dark:bg-gray-700'>
                            <TextAreaBody value={bugpostsdata.data.body} />
                        </pre>
                        <h3 className='px-8 py-1 text-sm text-gray-500'>tags: {bugpostsdata.data.tags}</h3>

                        <div className='flex flex-col mx-8 my-4 w-full border-t-[1px] border-borderBlack'>          {/* bug comments display element */}
                                {bugpostsdata.data.comments.map(item => <div key={item.comment} className='flex flex-row w-full border-b-[1px] border-borderBlack justify-between'>
                                    <div>
                                      <h4>{item.comment}</h4>
                                      <button onClick={e => deleteComment(item,bugpostsdata.ref)} className='text-sm text-borderBlack'>delete</button>
                                    </div>
                                    <div className='flex flex-col'>
                                      <a target='_blank' href={`/profile/${item.uid}`} className='ml-2 text-sm text-borderBlack'>Comment by: {item.username}</a>
                                    </div>
                                    <hr /></div>)}

                                <AddComments reference={bugpostsdata.ref} />                            {/* add comment to bug post component */}

                                </div>


                                <h4>Answers</h4>                                                   {/* bug answers display element */}
                                <hr/>
                                <div className='p-1 w-full bg-yellow-50 dark:bg-gray-300'>{bugpostsdata.data.answers.map(answer => (
                                  <div key={answer.answer} className='flex w-full flex-row py-1 border-b-[1px] text-lg dark:bg-gray-700'>
                                    <div className='flex flex-col w-[5%]'>
                                      <img onClick={e => upvote(bugpostsdata.ref)} className='w-8 h-8 mx-auto hover:cursor-pointer' src='/images/arrowup.svg' />
                                      <span className='mx-auto text-sm'>{bugpostsdata.data.votes.length}</span>
                                      <img className='w-8 h-8 mx-auto' src='/images/arrowdown.svg' />
                                    </div>
                                    <div className='flex flex-row w-[95%] justify-between'>
                                      <pre className='overflow-auto'>
                                        <TextAreaBody value={answer.answer} />
                                      </pre>
                                      <a target='_blank' href={`/profile/${answer.user.uid}`} className="text-sm text-borderBlack h-fit">answered by: {answer.user.username}</a>
                                    </div>
                                  </div>
                                ))}</div>
                                <h4>Add an Answer</h4>

                                <Answers reference={bugpostsdata.ref}/>                                     {/* add answer to bug post component */}
                            
                      </div>
                    </div>
                </>
                )}
            </div>
        </div>

    </>
  )
}
