Project Name
A robust Express + TypeScript + MongoDB backend project following clean architecture principles, featuring user management, articles, tags, and publishers with structured services, interfaces, and middleware.

Table of Contents:
1-Project Structure
2-Installed Packages & Their Purpose
3-Setup & Installation
4-Environment Variables
5-API Endpoints
6-Frontend Integration
7-File Overview

project-root/
│── src/
│   ├── Controllers/        # Route controllers (logic for each endpoint)
│   ├── Services/           # Business logic layer (implementations)
│   ├── Models/             # Mongoose schemas & models
│   ├── Routes/             # API route definitions
│   ├── Middleware/         # Middleware (error handling, auth, etc.)
│   ├── Interfaces/         # TypeScript interfaces for services
│   ├── config/             # Configuration files (e.g., db.ts)
│   └── index.ts            # Main entry point (server setup & configs)
│
├── .env                    # Environment variables
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration
└── nodemon.json            # Nodemon configuration


Installed Packages & Their Purpose
Package	Purpose
express ---->	Web framework for Node.js
mongoose ---->	MongoDB object modeling
typescript ---->	Type-safe JS development
ts-node ---->	Run TS files directly
dotenv ---->	Load environment variables
bcryptjs ---->	Hashing passwords securely
jsonwebtoken ---->	JWT authentication
express-async-handler ---->	Handles async errors in Express routes
cors ---->	Enables cross-origin requests
nodemon ---->	Automatic server restart during development




Setup & Installation

Clone the repo:
git clone //URL of the project
cd project-name

Install dependencies:
npm install

Create .env file in the root folder with required variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret

Run the server (development mode):
npm run dev

Build & run (production mode):
npm run build
npm start


API Endpoints

All controllers use asyncHandler to handle errors automatically.

User Controller
/api/user/register	POST	Register new user
/api/user/login	POST	Login user & return JWT token
/api/user/publishers	GET	Get all publishers (excluding yourself)
/api/user/followPublisher	POST	Follow a publisher
/api/user/unfollowPublisher	POST	Unfollow a publisher

Article Controller
/api/article/publish	POST	Publish a new article
/api/article/feed	GET	Get user feed based on followed tags
/api/article/view	POST	Increment viewers 
/api/article/like	POST	Like an article and Increment Likes

Tag Controller
/api/tag/create	POST	Create a new tag
/api/tag/all	GET	Get all tags with their articles
/api/tag/followed	GET	Get tags the user follows
/api/tag/follow	POST	Follow a tag
/api/tag/unfollow	POST	Unfollow a tag
/api/tag/topVisited	GET	Get top visited tags



Environment Variables:

Do not commit .env. It should include:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret

Frontend Integration:
Use CORS middleware in index.ts to allow your frontend to interact with backend.

JWT token is required for protected routes. Include it in the Authorization header:
Authorization: Bearer <token>



File Overview:

Controllers/ → Handle HTTP requests and responses, call services.
Services/ → Contain business logic and interact with Models.
Interfaces/ → TypeScript interfaces for service contracts.
Models/ → Mongoose schema definitions.
Routes/ → Define all API endpoints and attach controllers.
Middleware/ → Auth, error handling, validation.
config/db.ts → MongoDB connection logic.
index.ts → Starts the server, applies middleware, and routes.


Notes:

All async functions are wrapped in asyncHandler to handle errors properly.
Clean architecture: controllers call services, services call models. Interfaces ensure type safety.
Followed best practices for dependency injection and separation of concerns.
