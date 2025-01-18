import React, { useState } from "react";
import { motion } from "framer-motion";
import Web3 from "web3";
import NavBar_Logout from "./NavBar_Logout";

const UploadPatient = () => {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    homeAddress: "",
    email: "",
    hhNumber: "",
    walletAddress: "",
  });

  const [patients, setPatients] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      const newErrors = {...errors};
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hhNumberRegex = /^\d{6}$/;

    // Validate each field
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
      }
    });

    // Specific validations
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.hhNumber && !hhNumberRegex.test(formData.hhNumber)) {
      newErrors.hhNumber = "HH Number must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    setIsLoading(true);
    const web3 = new Web3(window.ethereum);

    try {
      const accounts = await web3.eth.requestAccounts();

      const transactionParameters = {
        to: formData.walletAddress,
        from: accounts[0],
        value: web3.utils.toHex(web3.utils.toWei("0.01", "ether")),
        gas: "2000000",
      };

      await web3.eth.sendTransaction(transactionParameters);

      // Add the new patient data to the patients state
      setPatients((prevPatients) => [...prevPatients, formData]);
      
      // Clear the form
      setFormData({
        name: "",
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        homeAddress: "",
        email: "",
        hhNumber: "",
        walletAddress: "",
      });

      alert("Patient data uploaded successfully!");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = [
    { name: "name", label: "Name", type: "text", placeholder: "Enter Full Name" },
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { 
      name: "gender", 
      label: "Gender", 
      type: "select", 
      options: ["", "Male", "Female", "Other"] 
    },
    { name: "bloodGroup", label: "Blood Group", type: "text", placeholder: "Enter Blood Group" },
    { name: "homeAddress", label: "Home Address", type: "text", placeholder: "Enter Home Address" },
    { name: "email", label: "Email", type: "email", placeholder: "Enter Email" },
    { name: "hhNumber", label: "HH Number", type: "text", placeholder: "Enter HH Number" },
    { name: "walletAddress", label: "Wallet Address", type: "text", placeholder: "Enter Wallet Address" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <NavBar_Logout />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Upload Patient Data
        </motion.h1>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-gray-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {formFields.map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <label className="text-gray-300 mb-2">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`p-3 rounded-lg bg-gray-700 text-white border border-gray-600 hover:bg-gray-800 transition duration-200 ${errors[field.name] ? 'border-red-500' : ''}`}
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`p-3 rounded-lg bg-gray-700 text-white border border-gray-600 hover:bg-gray-800 transition duration-200 ${errors[field.name] ? 'border-red-500' : ''}`}
                />
              )}
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </motion.div>
          ))}

          <div className="flex justify-center md:col-span-2 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleUpload}
              disabled={isLoading}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg transition-all duration- 300 ease-in-out hover:shadow-lg disabled:opacity-50"
            >
              {isLoading ? 'Uploading...' : 'Upload Patient Data'}
            </motion.button>
          </div>
        </motion.form>

        {/* Display all uploaded patient data in a table */}
        <div className="uploaded-data mt-6 w-full overflow-x-auto">
          <h2 className="text-xl font-bold text-white">Uploaded Patient Data:</h2>
          {patients.length === 0 ? (
            <p className="text-gray-400">No patient data uploaded yet.</p>
          ) : (
            <table className="min-w-full bg-gray-900 text-white border border-gray-600 mt-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Date of Birth</th>
                  <th className="py-2 px-4 border-b">Gender</th>
                  <th className="py-2 px-4 border-b">Blood Group</th>
                  <th className="py-2 px-4 border-b">Home Address</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">HH Number</th>
                  <th className="py-2 px-4 border-b">Wallet Address</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={index} className="hover:bg-gray-800">
                    <td className="py-2 px-4 border-b">{patient.name}</td>
                    <td className="py-2 px-4 border-b">{patient.dateOfBirth}</td>
                    <td className="py-2 px-4 border-b">{patient.gender}</td>
                    <td className="py-2 px-4 border-b">{patient.bloodGroup}</td>
                    <td className="py-2 px-4 border-b">{patient.homeAddress}</td>
                    <td className="py-2 px-4 border-b">{patient.email}</td>
                    <td className="py-2 px-4 border-b">{patient.hhNumber}</td>
                    <td className="py-2 px-4 border-b">{patient.walletAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UploadPatient;