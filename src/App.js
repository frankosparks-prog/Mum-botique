// src/App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <div className="font-sans">
      <ScrollToTop />
      <Navbar />

      <main className="pt-24">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/trousers" element={<Trousers />} />
          <Route path="/categories/dresses" element={<Dresses />} />
          <Route path="/categories/shoes" element={<Shoes />} />
          <Route path="/categories/tops" element={<Tops />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
