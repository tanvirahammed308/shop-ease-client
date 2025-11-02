"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6 text-[#e94560]">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-8">
        Have any questions, feedback, or partnership ideas?  
        We’d love to hear from you. Get in touch with the ShopEase team using the form below.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-200"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">Your Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#e94560] text-white px-6 py-2 rounded-lg hover:bg-[#e94560] transition"
        >
          Send Message
        </button>
      </form>

      <div className="mt-10 text-gray-700">
        <p><strong>Email:</strong> support@shopease.com</p>
        <p><strong>Phone:</strong> +880 1234-567890</p>
        <p><strong>Address:</strong> Dhaka, Bangladesh</p>
      </div>
    </main>
  );
}
