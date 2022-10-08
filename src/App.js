import './App.css';
import { BrowserRouter as Router, Routes, Route ,Link } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext';
import Dashboard from './components/login-utilities/dashboard';
import Login from './components/login-utilities/auth/login';
import Home from './components/profile-utilities/home';
import PrivateRoute from './components/login-utilities/auth/privateRoute';
import CreateProject from './components/create-utilities/createproject';
import Profile from './components/profile-utilities/profile';
import CreateAccount from './components/create-utilities/createaccount';
import UpdateProfile from './components/profile-utilities/updateprofile';
import MyProjects from './components/profile-utilities/myProjects';
import Project from './components/project-utilities/project';
import CreateBugPost from './components/create-utilities/createbugpost';
import BugPosts from './components/project-utilities/bugposts';
import OtherProfile from './components/profile-utilities/otherprofile';
import EditProject from './components/project-utilities/editProject';
import BugPost from './components/project-utilities/bugpost';
import NavBar from './components/navbar';
import { useState } from 'react';
import LeftNavBar from './components/leftnavbar';
import { ChatContextProvider } from './contexts/chatContext';
import SideBar from './components/chatComponent/sideBar';
import Chat from './components/chatComponent/chat';
import Todo from './components/profile-utilities/todo';
import Test from './components/test';

function App() {

  const [hideLeftBar,sethideLeftBar] = useState(false)
  const [page,setpage] = useState("")
  const [showChat,setshowChat] = useState(false)

  return (
    <AuthProvider>
      <Router>

        <NavBar showChat={showChat} setshowChat={setshowChat} />

        <div className='w-full'>
          <div className='max-w-8xl mx-auto'>

          {!hideLeftBar && (
            <LeftNavBar page={page}/>
          )}

          <div className={`flex flex-row ${hideLeftBar ? "max-w-full" : "max-w-full lg:pl-[10rem]"}`}>
            <div className={`flex flex-col float-right ${hideLeftBar ? "w-full" : "w-4/6"} mt-12 h-screen overflow-y-scroll dark:bg-gray-900 dark:text-white`}>
            <Routes>

            {/* Login routes */}

              <Route path='/login' element={<Login />} />
              {/* <Route path='/' element={<Dashboard hideLeftBar={sethideLeftBar}/>} /> */}
              <Route path='/' element={<Dashboard />} />
              
              {/* Profile utilities */}

              <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path='/my-projects' element={<PrivateRoute><MyProjects /></PrivateRoute>} />
              <Route path='/update-profile' element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
              <Route path='/profile/:id' element={<PrivateRoute><OtherProfile /></PrivateRoute>} />

              {/* Project utilities */}

              <Route path='/:id' element={<PrivateRoute><Project /></PrivateRoute>} />
              <Route path='/:id/bugposts' element={<PrivateRoute><BugPosts /></PrivateRoute>} />
              <Route path='/:id/:bugid' element={<PrivateRoute><BugPost /></PrivateRoute>} />
              <Route path='/:id/edit' element={<PrivateRoute><EditProject /></PrivateRoute>} />

              {/* Create utilities */}

              <Route path='/create-project' element={<PrivateRoute><CreateProject /></PrivateRoute>} />
              <Route path='/create-account' element={<PrivateRoute><CreateAccount /></PrivateRoute>} />
              <Route path='/:id/addbugpost' element={<PrivateRoute><CreateBugPost /></PrivateRoute>} />

              {/* Test route */}


            </Routes>
            </div>
            {!hideLeftBar && (
              <Todo />
            )}

            <ChatContextProvider>
              {!hideLeftBar && (
                <div className={`hidden lg:block top-12 ${showChat ? "w-1/2" : "w-0"} p-2 fixed bottom-0 right-0 h-screen bg-white border-l-[1px] dark:border-gray-400 dark:bg-black dark:text-white`}>
                  <div className='flex flex-row border-b-[1px]'>
                    <button onClick={() => setshowChat(!showChat)} className='dark:fill-white'>
                      {!showChat ?   <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                                      <path d="m24 31.3 2.1-2.1-3.7-3.7h9.1v-3h-9.1l3.7-3.7-2.1-2.1-7.3 7.3ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"/>
                                    </svg> 
                                  :
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                                      <path d="m24 31.3 7.3-7.3-7.3-7.3-2.1 2.1 3.7 3.7h-9.1v3h9.1l-3.7 3.7ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"/>
                                    </svg>
                                  }
                    </button>
                    <span className='flex justify-center items-center'>Messages</span>
                  </div>
                  <div className='flex flex-row'>
                    <SideBar showChat={showChat}/>
                    <Chat showChat={showChat}/>
                  </div>
                </div>
              )}
            </ChatContextProvider>
          </div>
          </div>
        </div>

      </Router>
    </AuthProvider>
  );
}

export default App;
