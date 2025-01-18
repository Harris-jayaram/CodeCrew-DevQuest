import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBar_Logout from "./NavBar_Logout";

function DiagnosticForm() {
  const [formData, setFormData] = useState({
    recordId: "",
    doctorName: "",
    patientName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    patientWalletAddress: "",
    diagnosticWalletAddress: "",
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validation
    const requiredFields = Object.values(formData);
    if (requiredFields.some(field => !field) || !uploadedFile) {
      setError("All fields are required.");
      return;
    }

    setSuccessMessage("Form submitted successfully!");
    
    // Reset form
    setFormData({
      recordId: "",
      doctorName: "",
      patientName: "",
      age: "",
      gender: "",
      bloodGroup: "",
      patientWalletAddress: "",
      diagnosticWalletAddress: "",
    });
    setUploadedFile(null);
  };

  const handleViewFile = () => {
    if (uploadedFile) {
      const fileURL = URL.createObjectURL(uploadedFile);
      window.open(fileURL, "_blank");
    }
  };

  const formFields = [
    { name: "recordId", label: "Record ID", type: "text" },
    { name: "doctorName", label: "Doctor Name", type: "text" },
    { name: "patientName", label: "Patient Name", type: "text" },
    { name: "age", label: "Age", type: "number" },
    { 
      name: "gender", 
      label: "Gender", 
      type: "select", 
      options: ["", "Male", "Female", "Other"] 
    },
    { name: "bloodGroup", label: "Blood Group", type: "text" },
    { name: "patientWalletAddress", label: "Patient Wallet Address", type: "text" },
    { name: "diagnosticWalletAddress", label: "Diagnostic Wallet Address", type: "text" },
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
          className="text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Diagnostic Report Form
        </motion.h1>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit} 
          className="max-w-4xl mx-auto bg-gray-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {formFields.map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <label className="text-gray-300 mb-2">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  >
                    {field.options.map(option => (
                      <option key={option} value={option}>{option || 'Select Option'}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                )}
              </motion.div>
            ))}

            {/* File Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: formFields.length * 0.1 }}
              className="flex flex-col md:col-span-2"
            >
              <label className="text-gray-300 mb-2">Upload Medical Document</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="p-3 rounded-lg bg-gray-700 text-white file:mr-4 file:rounded-full file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                required
              />
              {uploadedFile && (
                <div className="mt-4 flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                  <span className="text-white truncate">{uploadedFile.name}</span>
                  <button
                    type="button"
                    onClick={handleViewFile}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    View
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full hover:shadow-xl transition-all duration-300"
          >
            Submit Diagnostic Report
          </motion.button>
        </motion.form>

        {/* Error and Success Messages */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4 text-red-500"
          >
            {error}
          </motion.div>
        )}
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4 text-green-500"
          >
            {successMessage}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default DiagnosticForm;