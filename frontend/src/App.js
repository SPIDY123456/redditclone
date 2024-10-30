import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/Homepage';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import PostForm from './components/PostForm';
import CommentPage from "./pages/CommentPage";
import Profile from './pages/Profile';

const App = () => {
  const location = useLocation();

  
  const showNavbarAndSidebar = location.pathname !== '/login';

  return (
    <>
      {showNavbarAndSidebar && <Navbar />}
      {showNavbarAndSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/community:id" element={<CommunityPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-post" element={<PostForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/comments/:postId" element={<CommentPage />} />
      </Routes>
    </>
  );
}

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
