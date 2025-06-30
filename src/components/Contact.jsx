import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "./Footer";
import "../index.css"; // Import global styles

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const whatsappMessage = encodeURIComponent(
    "Hello, I would like to inquire about..."
  );

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch(`${SERVER_URL}/api/contact/send-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong.");
    }
  };

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
        <h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold drop-shadow-lg inconsolata-font">
          Contact Us
        </h1>
      </div>

      {/* Contact Form */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10 inconsolata-font " data-aos="fade-up">
          We'd Love to Hear From You
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6 bg-gray-50 p-8 rounded-xl shadow-lg"
          data-aos="fade-up"
        >
          <input
            name="name"
            type="text"
            placeholder="e.g., Jane Doe"
            className="p-4 border border-gray-300 rounded-lg focus:outline-pink-400"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="e.g., janedoe@gmail.com"
            className="p-4 border border-gray-300 rounded-lg focus:outline-pink-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="subject"
            type="text"
            placeholder="e.g., Dress Inquiry"
            className="p-4 border border-gray-300 rounded-lg focus:outline-pink-400 md:col-span-2"
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea
            name="message"
            rows="6"
            placeholder="Type your message here..."
            className="p-4 border border-gray-300 rounded-lg focus:outline-pink-400 md:col-span-2"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button
            type="submit"
            className="md:col-span-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Send Email
          </button>
          {status && (
            <p className="text-center md:col-span-2 text-pink-600 font-semibold">{status}</p>
          )}
          <p className="text-gray-800 font-dancing">
            You can also reach us at:{" "}
            <a
              href="mailto:mainafrank400@gmail.com?subject=Contact Us Inquiry&body=Hello, I would like to inquire about..."
              className="text-blue-800 underline"
            >
              mainafrank400@gmail.com
            </a>
          </p>
          <p className="text-gray-800 font-dancing">
            Or call us at:{" "}
            <a href="tel:+254738380692" className="text-blue-800 underline">
              +254 738380692
            </a>
          </p>
        </form>

        {/* WhatsApp */}
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
        <h3 className="text-2xl font-semibold text-center mb-6">Find Us Here</h3>
        <div className="rounded-xl overflow-hidden shadow-lg">
          
          <iframe
            title="MC Boutique Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8182306742206!2d37.07138007364027!3d0.012147364417538808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1787f6373e3b9761%3A0x4ce898c70ec4b036!2sFUNKYHOUSE%20ENTERTAINMENT!5e0!3m2!1sen!2ske!4v1746452683824!5m2!1sen!2ske"
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
