import React, { useContext } from 'react'
import { ChatContext } from '../../contexts/chatContext'
import Input from './input'
import Messages from './messages'

export default function Chat({showChat}) {
    const { data } = useContext(ChatContext)
    console.log(data.user?.username)
  return (
    <div className={`${showChat ? "block" : "hidden"} w-2/3 h-screen`}>
      <div className="m-2 border-b-[1.5px]">
        <span>Chatting with: {data.user?.username}</span>
        <div className="chatIcons">
          {/* <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" /> */}
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}
