import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import React, { useContext, useEffect, useState } from "react"
import { auth } from "../firebase"

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

    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setcurrentuser(user)
            setloading(false)
        })
        return unsubscribe
    })

    const value = {
        currentuser,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}