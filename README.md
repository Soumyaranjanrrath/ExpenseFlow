## ExpenseFlow – MERN Stack Expense & Payment Tracker : 

ExpenseFlow is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to manage and track personal or shared expenses, monitor payment statuses.

=>Features:
->Add, update, and delete expenses
->Track payment status (paid/unpaid)
->Set due dates and receive automated reminders
->Secure user authentication using JWT
->REST API built with Express and MongoDB
->Responsive UI built with React

Tech Stack:
- Frontend: React, Axios, React Router
- Backend: Node.js, Express.js, JWT, Bcrypt
- Database: MongoDB, Mongoose
- Others: dotenv, cors, body-parser

=> Project Structure :
ExpenseFlow/
├── backend/               
│   ├── controllers/       
│   ├── middleware/        
│   ├── models/            
│   ├── routes/            
│   ├── scheduler/         
│   ├── server.js          
│   └── .env.example       
│
├── frontend/              
│   ├── public/            
│   ├── src/               
│   │   ├── components/    
│   │   ├── pages/         
│   │   ├── context/       
│   │   ├── utils/         
│   │   └── App.js         
│   └── package.json       
│
├── README.md
└── .gitignore

=> Authentication Flow
Users can register and log in using secure credentials

JWT tokens are generated on login and used to access protected routes

Frontend stores the token and maintains authentication state using context

