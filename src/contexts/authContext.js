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
    // const [data,setdata] = useState()

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
        localStorage.removeItem('content')
        return signOut(auth)
    }

    async function setCurrentUser(name=null,photourl=null){ // update and make a new object section
        if(name != null && photourl == null){
            return await updateProfile(auth.currentUser,{
                displayName: name,
                })
            }
        else if(name== null && photourl != null){
            return await updateProfile(auth.currentUser,{
                photoURL: photourl,
            })
        }
        else{
            return await updateProfile(auth.currentUser,{
                displayName: name,
                photoURL: photourl,
            })
        }
    }

    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setcurrentuser(user)
            setloading(false)
        })

        return unsubscribe
    },)

    const value = {
        currentuser,
        login,
        logout,
        setCurrentUser
        // data,
        // setdata
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}