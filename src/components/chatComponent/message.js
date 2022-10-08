import React, { useContext, useEffect, useRef } from 'react'
import { useAuth } from '../../contexts/authContext';
import { ChatContext } from '../../contexts/chatContext';

export default function Message({message}) {
    const { currentuser } = useAuth();
    const { data } = useContext(ChatContext);

    const ref = useRef();
  
    useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
  
    if(currentuser){
      return (
        <div
          ref={ref}
          className={`flex mx-2 my-4 ${message.senderId === currentuser.uid && "flex-row-reverse"}`}
        >
          <div className="flex flex-col items-center">
            <img width={"24px"} height={"24px"} className="rounded-full"
              src={
                message.senderId === currentuser.uid
                  ? currentuser.photoURL
                  : data.user.photoURL
              }
              alt=""
            />
            <span className='text-sm'>just now</span>
          </div>
          <div className="mr-1 rounded-lg bg-blue-200 dark:bg-blue-600 px-3 h-fit">
            <p>{message.text}</p>
            {message.img && <a target="_blank" href={`${message.img}`}><img width={"128px"} height={"72px"} src={message.img} alt="" /></a>}
          </div>
        </div>
      )
  }else{return <></>}
}
