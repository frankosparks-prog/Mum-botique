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
      image: "/images/Shoes.jpg",
      link: "/categories/shoes",
    },
    {
      name: "Dresses",
      image: "/images/Dress.jpg",
      link: "/categories/dresses",
    },
    {
      name: "Trousers",
      image: "/images/Trousers.jpg",
      link: "/categories/trousers",
    },
    {
      name: "Tops",
      image: "/images/Tops.jpg",
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
              className="w-full h-48 sm:h-48 md:h-60 lg:h-64 object-cover rounded-t-2xl"
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
