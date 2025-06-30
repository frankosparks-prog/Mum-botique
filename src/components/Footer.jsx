import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const modalsContent = {
  returns: {
    title: "Returns & Exchanges",
    body: `MC Boutique is committed to your satisfaction. If you're not happy with your item, returns are accepted within 14 days of delivery.
Items must be in original condition — unworn, unwashed, and with original packaging/tags intact.
Please note:

- All return requests must be initiated via WhatsApp for personalized assistance.
Refunds or exchanges are processed once we receive and inspect the item.`,
  },
  shipping: {
    title: "Shipping & Delivery",
    body: `We deliver across Kenya via trusted courier services. Orders are processed within 1–2 business days.
Delivery estimates:
- Within Nanyuki: Same-day or next-day delivery (subject to stock).
- Other locations: 2–4 business days.
Delivery costs:
- FREE for orders over Ksh 2,500.
- Orders below that may attract a small fee (confirmed via WhatsApp).
Pickup Option: You may also collect in-store. Contact us via WhatsApp to coordinate.`,
  },
  faq: {
    title: "Frequently Asked Questions",
    body: `Here are answers to our most common questions:

• How do I place an order? — Browse our catalogue and contact us via WhatsApp to confirm availability and finalize the purchase.
• What payment methods do you accept? — M-Pesa is our primary method. Bank and cash options may be arranged upon request.
• Can I cancel my order? — Yes, if it hasn’t been dispatched yet. Please reach out quickly via WhatsApp.
• Do you have a physical shop? — Yes! Visit us in Nanyuki. Details are on the Contact Us page.

Still need help? We're happy to assist on WhatsApp or call: +254 708-127-470.`,
  },
  privacy: {
    title: "Privacy Policy",
    body: `Your privacy is a priority at MC Boutique. Here's how we handle your data:

- We collect minimal personal info (e.g. name, phone number) only when you voluntarily contact us.
- Communications, including order and payment arrangements, are handled exclusively via WhatsApp.
- We do not collect or store credit card details or sensitive personal data on this site.
- Your contact information is never shared or sold to third parties.
- If you opt in to marketing messages, you can opt out anytime via WhatsApp or email.

This site serves as a catalogue only. All transactions and sensitive communication occur securely off-site.`,
  },
};

function Footer() {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <footer className="bg-gradient-to-r from-pink-700 to-pink-400 text-white py-16 relative z-10 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-6 md:mb-0 max-w-lg">
            <h2 className="text-4xl font-bold mb-4 text-gray-100 fresca-font">
              MC Boutique
            </h2>
            <p className="text-lg text-gray-200 inconsolata-font">
              Discover timeless elegance with our premium MC products.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap md:flex-nowrap justify-between space-x-12">
            <div>
              <h3 className="font-bold text-xl mb-4">Quick Links</h3>
              <ul>
                <li>
                  <a
                    href="/"
                    className="text-gray-900 font-semibold hover:text-pink-200"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="text-gray-900 font-semibold hover:text-pink-200"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-900 font-semibold hover:text-pink-200"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-900 font-semibold hover:text-pink-200"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4">Customer Service</h3>
              <ul>
                <li>
                  <button
                    onClick={() => openModal("faq")}
                    className="text-gray-900 font-semibold hover:text-pink-200"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("returns")}
                    className="text-gray-900 font-semibold hover:text-pink-200"
                  >
                    Returns
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("shipping")}
                    className="text-gray-900 font-semibold hover:text-pink-200"
                  >
                    Shipping
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("privacy")}
                    className="text-gray-900 font-semibold hover:text-pink-200"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4">Contact Us</h3>
              <ul>
                <li className="text-gray-900 font-semibold">
                  Email: contact@MCboutique.com
                </li>
                <li className="text-gray-900 font-semibold">
                  Phone: (+254) 708-127-470
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-400 pt-8">
          <p className="text-sm text-gray-100">
            © 2025 MC Boutique. All Rights Reserved.
          </p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-3xl text-gray-900 hover:text-pink-200" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-3xl text-gray-900 hover:text-pink-200" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-3xl text-gray-900 hover:text-pink-200" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-3xl text-gray-900 hover:text-pink-200" />
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-lg relative">
            <h2 className="text-2xl font-bold mb-4 text-pink-700">
              {modalsContent[modalType].title}
            </h2>
            <p className="text-gray-700 mb-6">
              {modalsContent[modalType].body}
            </p>
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-pink-500 text-2xl hover:text-pink-700"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
