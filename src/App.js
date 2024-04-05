import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import {Navigate} from 'react-router-dom';
import {useState} from 'react';
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const [isAuthenticated] = useState(() => localStorage.getItem('token') !== null); // Check if user is authenticated

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/signup" replace />;
};
function App() {
  
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={Homepage} />}/>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
  