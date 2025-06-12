// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/scrollTop";

import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Trousers from "./components/Trousers";
import Dresses from "./components/Dresses";
import Shoes from "./components/Shoes";
import Tops from "./components/Tops";

// Admin components
import UsersDetails from "./components/Admin/UserDetails";
import ViewPayment from "./components/Admin/ViewPayment";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminLogin from "./components/Admin/AdminLogin";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import ManageProducts from "./components/Admin/ManageProducts";
import ProductDetailPage from "./components/ProductDetailPage";
import Bra from "./components/Bra";
import Ankara from "./components/Ankara";

const App = () => {
  return (
    <div className="font-sans">
      <ScrollToTop />
      <Navbar />

      <main className="pt-24">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/trousers" element={<Trousers />} />
          <Route path="/categories/dresses" element={<Dresses />} />
          <Route path="/categories/shoes" element={<Shoes />} />
          <Route path="/categories/tops" element={<Tops />} />
          <Route path="/categories/ankara" element={<Ankara />} />
          <Route path="/categories/bra" element={<Bra />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin routes */}
          <Route path="/mc/admin" element={<AdminLogin />} />
          <Route
            path="/mc/admin/dashboard/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="visitors" replace />} />
            <Route path="visitors" element={<UsersDetails />} />
            <Route path="payments" element={<ViewPayment />} />
            <Route path="products" element={<ManageProducts />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
