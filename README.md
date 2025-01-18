# Decentralized Health History Management Application

## Overview
This project leverages Ethereum blockchain technology to develop a secure, transparent, and patient-centric health history management system. Patients can upload, manage, and share medical records with authorized entities like doctors and diagnostic centers, ensuring privacy, security, and compliance with global healthcare regulations.

## Key Features
- **Patient Control:** Upload, view, and manage medical records; grant/revoke access to doctors and diagnostic centers.
- **Doctor Access:** View patient records, generate consultancy reports, and manage patient lists.
- **Diagnostic Centers:** Create and upload EHR reports, ensuring transparency for patients and doctors.

## Prerequisites
To set up and run this application, ensure you have the following installed:
- **Node.js** (version 14.x or above)
- **NPM** (Node Package Manager)
- **Metamask** (Browser Extension)
- **Ganache** (Local Ethereum blockchain for development)
- **Truffle Framework** (for smart contract development)
- **Git** (for version control)
- **Ethereum Wallet** (for testing blockchain interactions)

Additionally, you'll need basic knowledge of blockchain, Ethereum, and smart contract development to configure and deploy the application.

## Technology Stack
- **Blockchain:** Ethereum with smart contracts written in Solidity.
- **Frontend:** ReactJS for an intuitive user interface.
- **Development Tools:** Metamask, Ganache, Truffle, Node.js.
- **Version Control:** Git.

## System Architecture
1. **Blockchain Layer:** Stores metadata, access logs, and user permissions.
2. **Smart Contracts:**
   - `PatientSmartContract`: Manages health records and permissions.
   - `DoctorSmartContract`: Manages patient lists and record access.
   - `DiagnosticSmartContract`: Manages EHR report creation and uploads.
3. **Frontend (ReactJS):** Provides user interfaces for patients, doctors, and diagnostic centers.

## Compliance and Security
- **Regulations:** HIPAA, GDPR, PDPB.
- **Security Features:** Role-based Access Control (RBAC), end-to-end encryption, and tamper-proof blockchain storage.

## Challenges and Solutions
- **Scalability:** Addressed using Layer-2 solutions like Polygon.
- **User-Friendly Design:** Intuitive ReactJS interface with seamless Metamask integration.
- **Data Privacy:** Enforced through smart contracts and encryption mechanisms.

## Conclusion
The Decentralized Health History Management Application empowers patients by giving them control over their medical data while ensuring secure and efficient sharing with healthcare professionals. This innovative approach enhances healthcare delivery and outcomes.

---
**Contributors**  
- Harris Jayaram R  
- Thadeus Cruz Govindapillai  
- Selvendran S
