import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "./Footer";

function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const whatsappMessage = encodeURIComponent("Hello, I would like to inquire about...");

  return (
    <div className="bg-white text-gray-800 mt-[-1.9rem]">
      {/* Hero Section */}
      <div
        className="relative h-[350px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://picsum.photos/800/350?random=16')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
          Contact Us
        </h1>
      </div>

      {/* Contact Form */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10" data-aos="fade-up">
          We'd Love to Hear From You
        </h2>
        <form
          className="grid md:grid-cols-2 gap-6 bg-gray-50 p-8 rounded-xl shadow-lg"
          data-aos="fade-up"
        >
          <input
            type="text"
            placeholder="e.g., Jane Doe"
            className="p-4 border border-gray-300 rounded-lg focus:outline-pink-400"
            required
          />
          <input
            type="email"
            placeholder="e.g., janedoe@gmail.com"
            className="p-4 border border-gray-300 rounded-lg focus:outline-pink-400"
            required
          />
          <input
            type="text"
            placeholder="e.g., Dress Inquiry"
            className="p-4 border border-gray-300 rounded-lg focus:outline-pink-400 md:col-span-2"
          />
          <textarea
            rows="6"
            placeholder="Type your message here... (e.g., I'm interested in a red dress I saw in your catalogue.)"
            className="p-4 border border-gray-300 rounded-lg focus:outline-pink-400 md:col-span-2"
            required
          ></textarea>
          <button
            type="submit"
            className="md:col-span-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Send Email
          </button>
        </form>

        {/* WhatsApp Contact */}
        <div className="flex justify-center mt-10" data-aos="fade-up">
          <a
            href={`https://wa.me/254738380692?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition"
          >
            <FaWhatsapp className="text-2xl" />
            Contact via WhatsApp
          </a>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-6 pb-16 max-w-6xl mx-auto" data-aos="fade-up">
        <h3 className="text-2xl font-semibold text-center mb-6">
          Find Us Here
        </h3>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="MC Boutique Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.5708131124986!2d36.82194661604801!3d-1.2920657998741914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10ab684f4ed1%3A0x3ef254fc33a765bb!2sNairobi%20CBD!5e0!3m2!1sen!2ske!4v1615551754905!5m2!1sen!2ske"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-96"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
