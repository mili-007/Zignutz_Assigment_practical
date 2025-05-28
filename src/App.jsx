import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css'
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import DashboardLayout from './components/dasboardLayout/DashboardLayout';
import ProductList from './pages/product/ProductList';
import ProductDetail from './pages/product/productDetail/ProductDetail';
import ChangePassword from './pages/chnagepassword/ChangePassword';
import { LOGIN, PRODUCTS } from './utils/helper';
import EditProfile from './pages/editProfile/EditProfile';

function App() {
  const user = localStorage.getItem("userId");
  const PrivateRoute = () => {
    const user = localStorage.getItem("userId");
    return user ? <Outlet/> : <Navigate to={LOGIN} />;
  };
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={LOGIN} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path={PRODUCTS} element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
