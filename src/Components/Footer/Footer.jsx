import Lottie from "lottie-react";
import React from "react";
import animationDataLogo from "../assets/logo.json"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className=" px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and About */}
        <div>
            <div className="flex items-center ">

            <div className="w-12 h-12 ">
            <Lottie animationData={animationDataLogo}></Lottie>
        
            </div>
            <h2 className="font-bold text-lg">JobPortal</h2>
            </div>
          <p className="mt-2 text-sm">
            Your trusted platform for finding the perfect job or hiring the right candidate.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li><a href="/about" className="link link-hover">About Us</a></li>
            <li><a href="/jobs" className="link link-hover">Browse Jobs</a></li>
            <li><a href="/contact" className="link link-hover">Contact</a></li>
            <li><a href="/faq" className="link link-hover">FAQs</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-4">Categories</h3>
          <ul className="text-sm space-y-2">
            <li><a href="/category/technology" className="link link-hover">Technology</a></li>
            <li><a href="/category/marketing" className="link link-hover">Marketing</a></li>
            <li><a href="/category/finance" className="link link-hover">Finance</a></li>
            <li><a href="/category/healthcare" className="link link-hover">Healthcare</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">
            Email: <a href="mailto:info@jobportal.com" className="link link-hover">info@jobportal.com</a>
          </p>
          <p className="text-sm">
            Phone: <a href="tel:+123456789" className="link link-hover">+123-456-789</a>
          </p>
          <p className="text-sm">Address: 123 Main Street, City, Country</p>
        </div>
      </div>
      <div className="bg-gray-600 text-white text-center py-4">
        <p className="text-sm">&copy; 2024 JobPortal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
