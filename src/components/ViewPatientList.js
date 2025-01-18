import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBar_Logout from "./NavBar_Logout";

const ViewPatientList = () => {
  const patients = [
    {
      name: "John Doe",
      dateOfBirth: "1990-01-01",
      gender: "Male",
      bloodGroup: "O+",
      homeAddress: "123 Main St, Cityville",
      email: "john.doe@example.com",
      hhNumber: "HH123456",
      walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    },
    {
      name: "Jane Smith",
      dateOfBirth: "1985-05-15",
      gender: "Female",
      bloodGroup: "A+",
      homeAddress: "456 Elm St, Townsville",
      email: "jane.smith@example.com",
      hhNumber: "HH654321",
      walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    },
    {
      name: "Alice Johnson",
      dateOfBirth: "1992-03-20",
      gender: "Female",
      bloodGroup: "B+",
      homeAddress: "789 Oak St, Villagetown",
      email: "alice.johnson@example.com",
      hhNumber: "HH789012",
      walletAddress: "0x7890abcdef1234567890abcdef1234567890abcd",
    },
    {
      name: "Bob Brown",
      dateOfBirth: "1988-07-30",
      gender: "Male",
      bloodGroup: "AB-",
      homeAddress: "321 Pine St, Hamlet",
      email: "bob.brown@example.com",
      hhNumber: "HH345678",
      walletAddress: "0x4567890abcdef1234567890abcdef1234567890",
    },
    {
      name: "Charlie Davis",
      dateOfBirth: "1995-11-11",
      gender: "Male",
      bloodGroup: "O-",
      homeAddress: "654 Maple St, Citytown",
      email: "charlie.davis@example.com",
      hhNumber: "HH987654",
      walletAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    },
    {
      name: "Diana Prince",
      dateOfBirth: "1993-09-09",
      gender: "Female",
      bloodGroup: "A-",
      homeAddress: "159 Cedar St, Metropolis",
      email: "diana.prince@example.com",
      hhNumber: "HH123789",
      walletAddress: "0x1234567890abcdefabcdefabcdefabcdef123456",
    },
    {
      name: "Ethan Hunt",
      dateOfBirth: "1980-12-12",
      gender: "Male",
      bloodGroup: "B+",
      homeAddress: "753 Birch St, Gotham",
      email: "ethan.hunt@example.com",
      hhNumber: "HH456123",
      walletAddress: "0xabcdefabcdef1234567890abcdefabcdef123456",
    },
    {
      name: "Fiona Gallagher",
      dateOfBirth: "1991-04-04",
      gender: "Female",
      bloodGroup: "O+",
      homeAddress: "852 Spruce St, Star City",
      email: "fiona.gallagher@example.com",
      hhNumber: "HH321654",
      walletAddress: "0x1234567890abcdefabcdefabcdefabcdefabcdef",
    },
    {
      name: "George Costanza",
      dateOfBirth: "1987-08-08",
      gender: "Male",
      bloodGroup: "AB+",
      homeAddress: "963 Fir St, Springfield",
      email: "george.costanza@example.com",
      hhNumber: "HH654987",
      walletAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdef123456",
    },
    {
      name: "Hannah Baker",
      dateOfBirth: "1994-06-06",
      gender: "Female",
      bloodGroup: "A+",
      homeAddress: "147 Willow St, Hill Valley",
      email: "hannah.baker@example.com",
      hhNumber: "HH789456",
      walletAddress: "0x1234567890abcdefabcdefabcdefabcdefabcdef",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedPatients = [...patients].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredPatients = sortedPatients.filter((patient) =>
    Object.values(patient).some(( value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
          Registered Patients
        </motion.h1>

        <div className="mb-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-grow mr-4"
          >
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white mr-2">Total Patients: {filteredPatients.length}</span>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="overflow-x-auto"
        >
          {filteredPatients.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No patient data available.
            </div>
          ) : (
            <table className="min-w-full bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  {[
                    'Name', 'Date of Birth', 'Gender', 'Blood Group', 
                    'Home Address', 'Email', 'HH Number', 'Wallet Address'
                  ].map((header, index) => (
                    <th 
                      key={index} 
                      onClick={() => handleSort(header.toLowerCase().replace(/\s/g, ''))}
                      className="py-4 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
                    >
                      {header}
                      {sortConfig.key === header.toLowerCase().replace(/\s/g, '') && (
                        <span className="ml-2">
                          {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.3
                    }}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-4 px-6 border-b border-gray-700 text-white">{patient.name}</td>
                    <td className="py-4 px-6 border-b border-gray-700 text-white">{patient.dateOfBirth}</td>
                    <td className="py-4 px-6 border-b border-gray-700 text-white">{patient.gender}</td>
                    <td className="py-4 px-6 border-b border-gray-700 text-white">{patient.bloodGroup}</td>
                    <td className="py-4 px-6 border-b border-gray-700 text-white">{patient.homeAddress}</td>
                    <td className="py-4 px-6 border-b border-gray-700 text-white">{patient.email}</td>
                    <td className="py-4 px-6 border-b border-gray-700 text-white">{patient.hhNumber}</td>
                    <td className="py-4 px-6 border-b border-gray-700 text-white">{patient.walletAddress}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ViewPatientList;