import { GithubAuthProvider, signInWithPopup, updateProfile, signOut } from "firebase/auth"
import { getDoc } from "firebase/firestore"
import React, { useContext, useEffect, useState } from "react"
import { auth, database } from "../firebase"

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

const provider = new GithubAuthProvider()

export function AuthProvider({children}){
    const [currentuser, setcurrentuser] =  useState()
    const [loading, setloading] = useState(true)

    function login(){
        return signInWithPopup(auth, provider).then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result)
            const token = credential.accessToken


        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            const email = error.customData.email
            const credentail = GithubAuthProvider.credentialFromError(error)
            console.log(errorCode)
        })
    }

    function logout(){
        return signOut(auth)
    }

    async function setCurrentUser(name=null,photourl=null){
        if(name != null && photourl == null){
            return await updateProfile(auth.currentUser,{
                displayName: name
                })
            }
        else if(name== null && photourl != null){
            return await updateProfile(auth.currentUser,{
                photoURL: photourl
            })
        }
        else{
            return await updateProfile(auth.currentUser,{
                displayName: name,
                photoURL: photourl
            })
        }
    }

    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setcurrentuser(user)
            setloading(false)
        })

        async function fetch(){
            const ref = database.user(currentuser.uid)
            const docSnap = await getDoc(ref)                           // checking if existing user database exists in users collection
            if(docSnap.exists()){
              if(docSnap.data().username && docSnap.data().photoURL){
                await setCurrentUser(docSnap.data().username,docSnap.data().photoURL)
              }
            }
          }
  
        currentuser && fetch()

        return unsubscribe
    })

    const value = {
        currentuser,
        login,
        logout,
        setCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}