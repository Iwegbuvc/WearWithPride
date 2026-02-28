
import React, { Suspense, lazy } from "react";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Adminlayout from "./components/Admin/layout";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/adminOrders";
import ProductsPage from "./pages/ProductPage";
import Orders from "./components/Orders/orders.jsx";
import CheckOut from "./components/Cart/CheckOut.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";


const PaymentCallback = lazy(() => import("./pages/PaymentCallback.jsx"));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="category/:category" element={<ProductsPage />} />
              <Route path="checkout" element={<CheckOut />} />
              <Route path="orders" element={<Orders />} />
            </Route>
            <Route path="/admin" element={<Adminlayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="/payment/callback" element={<PaymentCallback />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
