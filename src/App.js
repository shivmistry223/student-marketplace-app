import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ProductForm from './components/ProductForm/ProductForm';
import Register from './components/Register/Register';

function App() {
  const [user, setUser] = useState({})

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user}/>} />
        <Route path="/product-detail/:id" element={<ProductDetails user={user}/>} />
        <Route path="/product-form" element={<ProductForm user={user}/>} />
        <Route path="*" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;