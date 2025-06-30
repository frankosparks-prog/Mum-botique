import React, { useEffect } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import backgroundImage from "../Assets/about-us2.jpg";
import "../index.css";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <div className="bg-white text-gray-800 overflow-x-hidden mt-[-1.9rem]">
        {/* Hero Section */}
       <div
  className="relative h-[350px] flex items-center justify-center bg-contain bg-center bg-no-repeat w-full"
  style={{
    backgroundImage: `url(${backgroundImage})`,
  }}
>
          <div className="bg-black/10 w-full h-full absolute top-0 left-0" />
          {/* <h1
            className="relative text-white text-4xl md:text-5xl font-bold drop-shadow-lg z-10 px-4 text-center"
            data-aos="fade-up"
          >
            About Us
          </h1> */}
        </div>

        {/* Our Story */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 ">
          <h2
            className="text-3xl text-center mb-6 font-bold"
            data-aos="fade-up"
          >
            Our Story
          </h2>
          <p
            className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto foontt-regularr"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            MC Boutique was born from a love of timeless style, self-expression,
            and the desire to help everyone feel confidently beautiful. What
            started as a humble corner store has grown into a boutique that
            delivers elegance, quality, and charm to all who walk through our
            door.
          </p>
        </section>

        {/* Mission and Values */}
        <section className="bg-gray-100 py-14 px-4 sm:px-6 ">
          <div
            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start"
            data-aos="fade-up"
          >
            <div data-aos="fade-right">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                We are here to celebrate individuality and inspire confidence.
                By offering high-quality beauty essentials and stylish trends,
                we aim to make every customer feel empowered, valued, and
                radiant in their own skin.
              </p>
            </div>
            <div data-aos="fade-left">
              <h3 className="text-2xl font-bold mb-4">Our Core Values</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Grace in every detail</li>
                <li>Unmatched customer care</li>
                <li>Inclusivity & diversity</li>
                <li>Authenticity & sustainability</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Visual Appeal / Quote */}
        <section className="py-16 bg-white px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center" data-aos="zoom-in">
            <blockquote className="italic text-xl text-pink-500 mb-4 font-medium">
              "Beauty begins the moment you decide to be yourself." – Coco
              Chanel
            </blockquote>
            <img
              src="https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=900&q=80"
              alt="Boutique vibe"
              className="rounded-xl shadow-lg mx-auto mt-6 w-full max-w-md object-cover"
              data-aos="fade-up"
              data-aos-delay="200"
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-pink-100 py-12 px-4 text-center" data-aos="fade-up">
          <h4 className="text-2xl font-semibold text-gray-800 mb-4">
            Join Our Journey
          </h4>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            Be part of a community that uplifts style, celebrates uniqueness,
            and embraces beauty in all forms. Discover collections crafted with
            love, care, and charm.
          </p>
          <Link
            to="/products"
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-md transition duration-300 inline-block"
          >
            Explore Our Products
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default About;
