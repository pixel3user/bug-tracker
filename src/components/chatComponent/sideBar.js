import React from 'react'
import ChatNavBar from './chatNavBar'
import Chats from './chats'
import Search from './search'

export default function SideBar({showChat}) {
  return (
    <div className={`h-screen ${showChat ? "w-1/3" : "w-full"} border-r-[1px]`}>
        <ChatNavBar />
        <Search />
        <Chats />
    </div>
  )
}
