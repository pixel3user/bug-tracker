import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { ChatContext } from "../../contexts/chatContext";
import { database } from "../../firebase";

export default function Chats() {
    const [chats, setChats] = useState([]);

    const { currentuser } = useAuth();
    const { dispatch } = useContext(ChatContext);
  
    useEffect(() => {
      const getChats = () => {
        const unsub = onSnapshot(database.userChats(currentuser.uid), (doc) => {
          setChats(doc.data());
        });
  
        return () => {
          unsub();
        };
      };
  
      currentuser.uid && getChats();
    }, [currentuser.uid]);
  
    const handleSelect = (u) => {
      console.log(u)
      dispatch({ type: "CHANGE_USER", payload: u });
    };
    
    console.log(chats)
    return (
      <div className="flex flex-col">
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
          <div
            className="flex flex-row my-2 hover:cursor-pointer"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img width={"48px"} height={"48px"} className="rounded-full" src={chat[1].userInfo.photoURL} alt="" />
            <div className="flex flex-col justify-center items-center mx-3">
              <span>{chat[1].userInfo.username}</span>
              {/* <p>{chat[1].lastMessage?.text}</p> */}
            </div>
          </div>
        ))}
      </div>
    );
}
