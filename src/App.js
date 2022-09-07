import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>

        {/* Login routes */}

          <Route path='/login' element={<Login />} />
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

          <Route path='/create-project' element={<PrivateRoute><CreateProject/></PrivateRoute>} />
          <Route path='/create-account' element={<PrivateRoute><CreateAccount /></PrivateRoute>} />
          <Route path='/:id/addbugpost' element={<PrivateRoute><CreateBugPost /></PrivateRoute>} />


        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
