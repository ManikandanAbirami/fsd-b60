import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Profile from './components/profile/Profile'
import Feed from './components/Feed'
import NewPost from './components/NewPost';
import PrivateRoute from './components/routing/PrivateRoute'
import './App.css'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/feed" element={<PrivateRoute><Feed /></PrivateRoute>} />
            <Route path="/create-post" element={<PrivateRoute><NewPost /></PrivateRoute>} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App
