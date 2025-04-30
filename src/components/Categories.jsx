import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Categories() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const categories = [
    {
      name: "Shoes",
      image: "https://images.unsplash.com/photo-1519741491086-345f3a3f3d84?auto=format&fit=crop&w=600&q=80",
      link: "/categories/shoes",
    },
    {
      name: "Dresses",
      image: "https://images.unsplash.com/photo-1602810319424-d6c8f89deba7?auto=format&fit=crop&w=600&q=80",
      link: "/categories/dresses",
    },
    {
      name: "Trousers",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80",
      link: "/categories/trousers",
    },
    {
      name: "Tops",
      image: "https://images.unsplash.com/photo-1618354691211-c3c1b5b75c80?auto=format&fit=crop&w=600&q=80",
      link: "/categories/tops",
    },
  ];

  return (
    <>
    <div className="bg-white text-gray-800 min-h-screen pt-20 px-6 pb-16 mt-[-1.9rem] ">
      <h1 className="text-4xl font-bold text-center mb-12" data-aos="fade-down">
        Shop by Category
      </h1>
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Link
            to={category.link}
            key={category.name}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold text-pink-500">
                {category.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Categories;
