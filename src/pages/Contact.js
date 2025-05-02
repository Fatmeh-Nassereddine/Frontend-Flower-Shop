
// import { Layout } from "@/components/layout/Layout";
import PrimaryButton from "../components/PrimaryButton";
import { Input } from "../components/ui/Input";
import { MapPin, Phone, Mail } from "lucide-react";
import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };
  
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-semibold mb-8 text-center font-hina text-[#593825]">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6 font-hina text-[#593825]">Send us a message</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6">
                Thank you for your message! We will get back to you soon.
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-hina text-[#593825]">Your Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-hina text-[#593825]">Email Address</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-2 font-hina text-[#593825]">Subject</label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-hina text-[#593825]">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-hina text-[#593825]"
                ></textarea>
              </div>
              
              <PrimaryButton type="submit" className="w-full bg-[#593825] hover:bg-[#472c1d] text-white">
                Send Message
              </PrimaryButton>
            </form>
          </div>
        </div>
        
        {/* Contact Info */}
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
  );
}
