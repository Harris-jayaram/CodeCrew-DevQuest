import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div >
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div className="bg-gray-800/50 rounded-xl p-6 shadow-2xl hover:bg-gray-800/70 transition duration-300">
                        <div className="flex items-center mb-4">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-16 w-16 text-purple-500 mr-4" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                            >
                                <path 
                                    fillRule="evenodd" 
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" 
                                    clipRule="evenodd" 
                                />
                            </svg>
                            <h1 className="text-4xl font-bold text-white">HealthReport</h1>
                        </div>
                        <p className="text-lg text-gray-400">
                            Comprehensive health management platform designed for modern healthcare professionals, 
                            providing seamless patient data tracking and advanced analytics.
                        </p>
                    </div>

                    {/* Quick Navigation */}
                    <div className="bg-gray-800/50 rounded-xl p-6 shadow-2xl hover:bg-gray-800/70 transition duration-300">
                        <h2 className="text-3xl font-bold mb-6 text-purple-400">Quick Navigation</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { 
                                    icon: '🏠', 
                                    label: 'Home',
                                    path: '/'
                                },
                                { 
                                    icon: 'ℹ️', 
                                    label: 'About Us',
                                    path: '/AboutPage'
                                },
                                { 
                                    icon: '📝', 
                                    label: 'Registration',
                                    path: '/register'
                                },
                                { 
                                    icon: '🔐', 
                                    label: 'Login',
                                    path: '/login'
                                }
                            ].map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.path} 
                                    className="flex items-center space-x-2 text-lg text-gray-300 hover:text-white cursor-pointer transition"
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Feedback Form Component */}
                    <FeedbackForm />
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 py-6 border-t border-gray-800">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-lg text-gray-400 mb-4 md:mb-0">
                        © 2024 CodeCrew. All Rights Reserved.
                    </p>
                    <div className="flex space-x-4">
                        {[
                            { icon: 'fab fa-twitter', link: '#' },
                            { icon: 'fab fa-github', link: '#' },
                            { icon: 'fab fa-linkedin', link: '#' },
                            { icon: 'fab fa-dribbble', link: '#' }
                        ].map((social, index) => (
                            <a 
                                key={index} 
                                href={social.link} 
                                className="text-gray-400 hover:text-white transition transform hover:scale-125"
                            >
                                <i className={`${social.icon} text-3xl`}></i>
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Feedback Form Component
const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Feedback submitted:', formData);
        // Add feedback submission logic
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="bg-gray-800/50 rounded-xl p-6 shadow-2xl hover:bg-gray-800/70 transition duration-300">
            <h2 className="text-3xl font-bold mb-6 text-purple-400">Send Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name" 
                    required
                    className="w-full p-3 text-lg bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 transition"
                />
                <input 
                    type="email"  
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email" 
                    required
                    className="w-full p-3 text-lg bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 transition"
                />
                <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Feedback" 
                    required 
                    className="w-full p-3 text-lg bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 transition"
                    rows="4"
                />
                <button 
                    type="submit" 
                    className="w-full text-lg bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
                >
                    Send Feedback
                </button>
            </form>
        </div>
    );
};

export default Footer;