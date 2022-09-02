import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext';
import Dashboard from './components/dashboard';
import Login from './components/auth/login';
import Home from './components/home';
import PrivateRoute from './components/auth/privateRoute';
import CreateProject from './components/createproject';
import Profile from './components/profile';
import CreateAccount from './components/createaccount';
import UpdateProfile from './components/updateprofile';
import MyProjects from './components/myProjects';
import Project from './components/project';
import CreateBugPost from './components/createbugpost';
import BugPosts from './components/bugposts';
import OtherProfile from './components/otherprofile';
import EditProject from './components/editProject';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/create-project' element={<PrivateRoute><CreateProject/></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='/profile/:id' element={<PrivateRoute><OtherProfile /></PrivateRoute>} />
          <Route path='/create-account' element={<PrivateRoute><CreateAccount /></PrivateRoute>} />
          <Route path='/update-profile' element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
          <Route path='/my-projects' element={<PrivateRoute><MyProjects /></PrivateRoute>} />
          <Route path='/:id' element={<PrivateRoute><Project /></PrivateRoute>} />
          <Route path='/:id/addbugpost' element={<PrivateRoute><CreateBugPost /></PrivateRoute>} />
          <Route path='/:id/bugposts' element={<PrivateRoute><BugPosts /></PrivateRoute>} />
          <Route path='/:id/edit' element={<PrivateRoute><EditProject /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
