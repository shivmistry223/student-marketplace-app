import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {/* <Route path="/register" element={<Register setUser={setUser} />} /> */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;