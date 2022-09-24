import './App.css';
import { BrowserRouter as Router, Routes, Route ,Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/authContext';
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

function App() {

  const [hideLeftBar,sethideLeftBar] = useState(true)
  const [page,setpage] = useState("")

  function Element({page}){
    switch(page){
      case "/":
        sethideLeftBar(true)
        return <Dashboard />
      case "/login":
        sethideLeftBar(true)
        return <Login/>
      case "/home":
        sethideLeftBar(false)
        setpage("/home")
        return <Home />
      case "/profile":
        sethideLeftBar(false)
        setpage("")
        return <Profile />
      case "/my-projects":
        sethideLeftBar(false)
        setpage("/my-projects")
        return <MyProjects />
      case "/update-profile":
        sethideLeftBar(true)
        return <UpdateProfile />
      case "/other-profile":
        sethideLeftBar(false)
        setpage("")
        return <OtherProfile />
      case "/project":
        sethideLeftBar(false)
        setpage("")
        return <Project />
      case "/bug-posts":
        sethideLeftBar(false)
        setpage("")
        return <BugPosts />
      case "/bug-post":
        sethideLeftBar(false)
        setpage("")
        return <BugPost />
      case "/edit-project":
        sethideLeftBar(false)
        setpage("")
        return <EditProject />
      case "/create-account":
        sethideLeftBar(true)
        return <CreateAccount />
      case "/create-project":
        sethideLeftBar(false)
        setpage("/create-project")
        return <CreateProject />
      case "/create-bugpost":
        sethideLeftBar(false)
        setpage("")
        return <CreateBugPost />
    }
  }

  return (
    <AuthProvider>
      <Router>

        <NavBar />

        <div className='w-full'>
          <div className='max-w-8xl mx-auto'>

          {!hideLeftBar && (
            <LeftNavBar page={page}/>
          )}

          <div className={`${hideLeftBar ? "max-w-full" : "max-w-7xl lg:pl-[10rem]"}`}>
            <div className='flex flex-col float-right w-full mt-12 h-screen overflow-y-scroll dark:bg-gray-900 dark:text-white'>
            <Routes>

            {/* Login routes */}

              <Route path='/login' element={<Element page={"/login"}/>} />
              {/* <Route path='/' element={<Dashboard hideLeftBar={sethideLeftBar}/>} /> */}
              <Route path='/' element={<Element page={"/"}/>} />
              
              {/* Profile utilities */}

              <Route path='/home' element={<PrivateRoute><Element page={"/home"}/></PrivateRoute>} />
              <Route path='/profile' element={<PrivateRoute><Element page={"/profile"}/></PrivateRoute>} />
              <Route path='/my-projects' element={<PrivateRoute><Element page={"/my-projects"}/></PrivateRoute>} />
              <Route path='/update-profile' element={<PrivateRoute><Element page={"/update-profile"}/></PrivateRoute>} />
              <Route path='/profile/:id' element={<PrivateRoute><Element page={"/other-profile"}/></PrivateRoute>} />

              {/* Project utilities */}

              <Route path='/:id' element={<PrivateRoute><Element page={"/project"}/></PrivateRoute>} />
              <Route path='/:id/bugposts' element={<PrivateRoute><Element page={"/bug-posts"}/></PrivateRoute>} />
              <Route path='/:id/:bugid' element={<PrivateRoute><Element page={"/bug-post"}/></PrivateRoute>} />
              <Route path='/:id/edit' element={<PrivateRoute><Element page={"/edit-project"}/></PrivateRoute>} />

              {/* Create utilities */}

              <Route path='/create-project' element={<PrivateRoute><Element page={"/create-project"}/></PrivateRoute>} />
              <Route path='/create-account' element={<PrivateRoute><Element page={"/create-account"}/></PrivateRoute>} />
              <Route path='/:id/addbugpost' element={<PrivateRoute><Element page={"/create-bugpost"}/></PrivateRoute>} />


            </Routes>
            </div>

            {!hideLeftBar && (
              <div className='hidden lg:block top-12 w-[10rem] p-2 fixed bottom-0 right-[max(0px,calc(50%-45rem))] hover:w-1/2 h-screen bg-white border-l-[1px] dark:border-gray-400 dark:bg-black dark:text-white'>
                Messages
              </div>
            )}
          </div>
          </div>
        </div>

      </Router>
    </AuthProvider>
  );
}

export default App;
