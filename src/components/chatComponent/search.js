import React, { useContext, useState } from "react";
import {
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../../contexts/authContext";
import { database } from "../../firebase";

export default function Search() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
  
    const { currentuser } = useAuth()
  
    const handleSearch = async () => {
      const q = query(
        database.users,
        where("username", "==", username)
      );
  
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (err) {
        setErr(true);
      }
    };
  
    const handleKey = (e) => {
      e.code === "Enter" && handleSearch();
    };
  
    const handleSelect = async () => {
      //check whether the group(chats in firestore) exists, if not create
      const combinedId =
        currentuser.uid > user.uid
          ? currentuser.uid + user.uid
          : user.uid + currentuser.uid;

      try {
        const res = await getDoc(database.chats(combinedId));
        
        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(database.chats(combinedId), { messages: [] })
  
          //create user chats
          await updateDoc(database.userChats(currentuser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              username: user.username,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          })
  
          await updateDoc(database.userChats(user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentuser.uid,
              username: currentuser.displayName,
              photoURL: currentuser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      } catch (err) {
        console.log(err)
      }
  
      setUser(null);
      setUsername("")
    }
    
    return (
      <div className="w-full">
        <div className="searchForm">
          <input
            className="rounded-lg w-full px-2 dark:bg-gray-700"
            type="text"
            placeholder="Find a user"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        {err && <span>User not found!</span>}
        {user && (
          <div className="my-4 hover:cursor-pointer flex flex-row" onClick={handleSelect}>
            <img width={"48px"} height={"48px"} className="rounded-full" src={user.photoURL} alt="" />
            <span className="mx-3 flex items-center justify-center">{user.username}</span>
          </div>
        )}
      </div>
    );
}