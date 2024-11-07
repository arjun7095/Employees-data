import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import EmployeeList from './pages/EmployeeList';
import EditEmployee from './pages/EditEmployee';
import CreateEmployee from './pages/CreateEmployee';
import ProtectedRoute from '../src/components/ProtectedRoute';
import Main from '../src/components/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/employees" element={<ProtectedRoute element={<EmployeeList />} />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/employees/edit/:id" element={<ProtectedRoute element={<EditEmployee />} />} />
        <Route path="/employees/create" element={<ProtectedRoute element={<CreateEmployee />} />} />
      </Routes>
    </Router>
  );
}

export default App;
