import React, { useContext, useState } from 'react'
import { useAuth } from '../../contexts/authContext';
import { ChatContext } from '../../contexts/chatContext';
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
  } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Input() {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
  
    const { currentuser } = useAuth()
    const { data } = useContext(ChatContext);
  
    const handleSend = async () => {
      if (img) {
        const storageRef = ref(storage, uuid());
  
        const uploadTask = uploadBytesResumable(storageRef, img);
  
        uploadTask.on(
          (error) => {
            //TODO:Handle Error
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentuser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          }
        );
      } else {
        if(!text){
          return
        }
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentuser.uid,
            date: Timestamp.now(),
          }),
        });
      }
  
      await updateDoc(doc(db, "userChats", currentuser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      setText("");
      setImg(null);
    }
    
    return (
      <div className="flex flex-row mx-2 justify-center items-center">
        <input
          type="text"
          placeholder="Type something..."
          className='rounded-xl px-2 border-[1.5px] dark:text-black'
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="flex flex-row">
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file" className='mx-2 hover:cursor-pointer'>
            {/* <img src="/images/img.png" alt="" /> */}
          </label>
          <button onClick={handleSend} className='rounded-xl border-[1.5px] bg-green-300 py-1 px-2 hover:bg-green-400 dark:bg-green-400 dark:hover:bg-green-500'>Send</button>
        </div>
      </div>
    );
}
