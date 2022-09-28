import { onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../contexts/chatContext';
import { database } from '../../firebase';
import Message from './message';

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
  
    useEffect(() => {
      const unSub = onSnapshot(database.chats(data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
  
      return () => {
        unSub();
      };
    }, [data.chatId]);
  
    console.log(messages)
  
    return (
      <div className="h-4/6 overflow-auto">
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </div>
    );
}
