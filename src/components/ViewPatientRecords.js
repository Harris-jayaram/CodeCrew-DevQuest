import React from "react";
import NavBar_Logout from "./NavBar_Logout";

function ViewPatientRecords() {
  // Dummy patient records
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

  return (
    <div>
      <NavBar_Logout />
      <div className="bg-gradient-to-b from-black to-gray-800 text-white p-10 font-mono">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">All Registered Patients</h1>
        {patients.length === 0 ? (
          <p>No patient data available.</p>
        ) : (
          <table className="min-w-full bg-gray-800 text-white border border-gray-600 mt-4">
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
                <tr key={index} className="hover:bg-gray-700">
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
    </div>
  );
}

export default ViewPatientRecords;