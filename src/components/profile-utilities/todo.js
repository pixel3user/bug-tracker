import { arrayRemove, arrayUnion, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { database } from '../../firebase'

export default function Todo() {

    const [todo, settodo] = useState()
    const [todoValue,settodoValue] = useState()
    const { currentuser } = useAuth()

    async function addTodo(e){                                                       
        e.preventDefault()
        if(todoValue){
            try{
                await updateDoc(database.user(currentuser.uid),{                               
                    todo: arrayUnion(todoValue)
                })
                settodo([...todo,todoValue])
                settodoValue('')
            }catch(error){
                console.log(error)
            }
        }
    }

    async function removeTodo(value){                                                       
        
        if(value){
            try{
                await updateDoc(database.user(currentuser.uid),{                              
                    todo: arrayRemove(value)
                })
                settodo(todo.filter(todo => todo != value))
            }catch(error){
                console.log(error)
            }
        }
    }

    useEffect(() => {
        async function fetchTODO(){
            
            if(!todo){
                try{
                    const ref = database.user(currentuser.uid)
                    const docSnap = await getDoc(ref)
                    settodo(docSnap.data().todo)
                  }catch(error){
                    console.log(error)
                  }
            }

        }
    
        currentuser && fetchTODO()
      },[])

   return (
    <div className='flex flex-col py-2 px-4 hidden lg:block float-right w-2/6 mt-20 w-96 h-[36rem] bg-todoListColor dark:bg-todoListBorder border-[1px] border-todoListBorder overflow-y-scroll'>
        <div className='border-b-[1px]'>
            <span className='font-bold text-sm'>TODO LIST</span>
            <form onSubmit={addTodo} className='flex flex-row m-1'>
                <input onChange={e => settodoValue(e.target.value)} className='mx-1 px-1 rounded-sm w-full' />
                <button className='px-1 h-fit bg-blue text-white rounded-sm hover:bg-darkBlue'>add</button>
            </form>
        </div>
        <div className='my-3 flex flex-col'>
            {todo && todo.map(todo => (
                <span key={todo} className='flex flex-row'>
                    <img onClick={() => removeTodo(todo)} className='w-5 h-5 hover:bg-navBarBorder hover:cursor-pointer' src='/images/check.svg' />
                    <span className='text-sm'>{todo}</span>
                </span>
            ))}
        </div>
    </div>
  )
}
