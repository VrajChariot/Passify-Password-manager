# Passify - Password Manager 🛡️
==============================

Passify is a secure and minimalistic password manager built using the **MERN stack (MongoDB, Express, React, Node.js)** with **Clerk** authentication and **Tailwind CSS** for a responsive UI. Each user has access only to their own encrypted set of passwords.

## 🔐 Features
-----------

*   🔑 Add, view, edit, and delete passwords securely
    
*   👤 Authentication & user management with **Clerk**
    
*   🔒 AES-256 encryption support coming soon
    
*   🧾 Passwords are user-isolated (each user accesses only their data)
    
*   📦 Backend built with **Express.js + MongoDB**
    
*   ⚛️ Frontend built in **React** with **Tailwind CSS**
    
*   🚀 Production deployment coming soon!
    

## 🧰 Tech Stack
-------------

*   **Frontend**: React, Tailwind CSS
    
*   **Backend**: Node.js, Express.js
    
*   **Database**: MongoDB (Mongoose)
    
*   **Authentication**: Clerk.dev
    
*   **Encryption**: AES-256 (planned)
    

## 📸 Screenshots
--------------

> Coming soon! Stay tuned for demo previews and hosted link.

## 📂 Folder Structure
-------------------
```
Passify-Password-Manager/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
├── server/           # Node.js backend
│   ├── routes/
│   ├── controllers/
│   └── models/
└── README.md
```

## 🚧 Roadmap
----------
    
*   Add AES-256 encryption for stored passwords
    
*   Deploy production version
    

## 🛠️ Installation
----------------

1.  Clone the repository:
    
` 
git clone https://github.com/yourusername/Passify-Password-Manager.git  cd Passify-Password-Manager  
`

1.  Install dependencies:
    
`   # For client  cd client && npm install  # For server  cd ../server && npm install   `

1.  Create .env files:
    
`   # server/.env  MONGO_URI=your_mongodb_connection_string  PORT=5000  SECRET_KEY=your_secret_key   `

1.  Run the app:
    

`   # Start backend  cd server && npm run dev  # Start frontend  cd ../client && npm start   `

## 🤝 Contributions
----------------

Contributions are welcome! Feel free to open issues or pull requests.

----------------
Made with ❤️ by [Vraj Shah](https://github.com/VrajChariot)
