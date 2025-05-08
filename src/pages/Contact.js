import React, { useState } from "react";
import axios from "axios";
import { MapPin, Phone, Mail } from "lucide-react";
import { Input } from "../components/ui/Input";
import Header from "../components/Header";
import Footer from "../components/Footer";
import contactBg from '../assets/contactBg.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://backend-flower-shop.onrender.com/api/contacts/submit',
        {
          first_name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            withCredentials: true,
          }
        }
      );

      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Submission failed');
      console.error('Error submitting contact:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-semibold mb-8 text-center font-hina text-[#593825]">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <div
            className="rounded-lg shadow bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${contactBg})` }}
          >
            <div className="bg-white bg-opacity-80 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6 font-hina text-[#593825]">Send us a message</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="text-lg block mb-2 font-hina text-[#593825]">Your Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full text-xl px-4 py-3"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="text-lg block mb-2 font-hina text-[#593825]">Email Address</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full text-xl px-4 py-3"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="text-lg block mb-2 font-hina text-[#593825]">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full text-xl px-4 py-3"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="text-lg block mb-2 font-hina text-[#593825]">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-xl font-hina text-[#593825]"
                  ></textarea>
                </div>

                {/* Centered Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-6 py-3 text-lg sm:text-xl font-semibold rounded-full transition duration-300"
                    style={{
                      backgroundColor: '#D63384',
                      color: '#FFFFFF',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#B03074';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#D63384';
                    }}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info Section */}
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-6 font-hina text-[#593825]">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-[#593825] mt-1" />
                  <div>
                    <h3 className="font-medium font-hina text-[#593825]">Our Location</h3>
                    <p className="text-gray-600 font-hina text-[#593825]">123 Flower Street, Beirut, Lebanon</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 text-[#593825] mt-1" />
                  <div>
                    <h3 className="font-medium font-hina text-[#593825]">Phone Number</h3>
                    <p className="text-gray-600 font-hina text-[#593825]">+961-81-888-111</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 text-[#593825] mt-1" />
                  <div>
                    <h3 className="font-medium font-hina text-[#593825]">Email Address</h3>
                    <p className="text-gray-600 font-hina text-[#593825]">info@flowerbloom.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6 font-hina text-[#593825]">Opening Hours</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-hina text-[#593825]">Monday - Friday</span>
                  <span className="font-hina text-[#593825]">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-hina text-[#593825]">Saturday</span>
                  <span className="font-hina text-[#593825]">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-hina text-[#593825]">Sunday</span>
                  <span className="font-hina text-[#593825]">10:00 AM - 3:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
