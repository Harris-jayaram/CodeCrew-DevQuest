import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'; // Adjust the import path as needed

const Aboutpage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Add NavBar at the top */}
            <NavBar />

            <div className="container mx-auto p-6">
                <section className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                        About Health Record Management
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Revolutionizing healthcare data management through secure blockchain technology
                    </p>
                </section>

                {/* <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        {
                            name: "Dr. Sarah Chen",
                            role: "Blockchain Architect",
                            description: "Leading expert in healthcare blockchain implementation with 10+ years of experience",
                            image: "https://placehold.co/100x100"
                        },
                        {
                            name: "James Wilson",
                            role: "Security Specialist",
                            description: "Cybersecurity expert focused on protecting sensitive medical data",
                            image: "https://placehold.co/100x100"
                        },
                        {
                            name: "Maria Rodriguez",
                            role: "Healthcare Integration Lead",
                            description: "Specializes in seamless integration of blockchain with existing healthcare systems",
                            image: "https://placehold.co/100x100"
                        }
                    ].map((member, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300"
                        >
                            <img 
                                src={member.image} 
                                alt={`Profile picture of ${member.name}`} 
                                className="mx-auto mb-4 rounded-full w-24 h-24 object-cover"
                            />
                            <h2 className="text-xl font-semibold">{member.name}</h2>
                            <p className="text-gray-500 mb-2">{member.role}</p>
                            <p className="text-gray-600">{member.description}</p>
                        </div>
                    ))}
                </section> */}

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-purple-600">Our Mission</h2>
                        <p className="text-gray-600 mb-4">
                            We are dedicated to transforming healthcare record management through innovative blockchain technology. 
                            Our platform ensures secure, transparent, and efficient handling of sensitive medical data while maintaining 
                            the highest standards of privacy and accessibility.
                        </p>
                        <p className="text-gray-600">
                            By leveraging blockchain's immutable nature, we create a trusted environment where healthcare providers 
                            and patients can safely manage and share medical records.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-purple-600">Why Blockchain?</h2>
                        <ul className="text-gray-600 space-y-4">
                            {[
                                {
                                    icon: "fas fa-lock",
                                    text: "Enhanced security through cryptographic protection of sensitive medical data"
                                },
                                {
                                    icon: "fas fa-shield-alt",
                                    text: "Immutable record-keeping ensuring data integrity and trust"
                                },
                                {
                                    icon: "fas fa-handshake",
                                    text: "Improved collaboration between healthcare providers while maintaining patient privacy"
                                }
                            ].map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <i className={`${item.icon} mr-3 text-purple-600 text-xl`}></i>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="bg-purple-100 p-8 rounded-lg text-center">
                    <h2 className="text-2xl font-bold mb-4 text-purple-800">
                        Ready to Transform Healthcare?
                    </h2>
                    <p className="text-gray-700 mb-6 text-lg">
                        Join us in revolutionizing medical record management
                    </p>
                    <button 
                        onClick={() => navigate('/register')}
                        className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center mx-auto"
                    >
                        Get Started 
                        <i className="fas fa-arrow-right ml-3"></i>
                    </button>
                </section>
            </div>

            {/* Optional: Footer Component */}
            {/* <Footer /> */}
        </div>
    );
};

export default Aboutpage;