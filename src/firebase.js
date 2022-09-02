// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, collectionGroup, doc, getFirestore, serverTimestamp } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBva6RwtMMVmkdcx_E4586XcD-R62z0qws",
  authDomain: "test-project-42b86.firebaseapp.com",
  projectId: "test-project-42b86",
  storageBucket: "test-project-42b86.appspot.com",
  messagingSenderId: "295101322573",
  appId: "1:295101322573:web:e5e93a4f78d4db83831304"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const database = {
    users: collection(db,"users"),
    user: (document) => doc(db,"users",document),
    profilePicStorage: (document) => ref(storage,`profilePics/${document}`),
    projects: collection(db,'projects'),
    projectsGroup: (document) => collectionGroup(db,document),
    getCurrentTimeStamp: serverTimestamp,
    public: (document) => doc(db,'public',document),
    project: (document) => doc(db,'projects',document,'info','data')
}

export const storage = getStorage(app)
export const auth = getAuth(app)
