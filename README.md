# FurryFriends 🐾

**FurryFriends** is a comprehensive MERN-stack web application dedicated to pet lovers. It combines the community engagement of a social media platform with the utility of an adoption hub, a rescue network, and a fully functional e-commerce marketplace for pet supplies.

## ✨ Key Features

* **🐾 Pet Social Media:** Share photos, stories, and updates about your pets with a dedicated community of animal lovers.
* **🏡 Adoption Hub & Geolocation:** Browse pets available for adoption and view the exact locations of adoption points and shelters on an interactive map.
* **🆘 Rescue Requests:** A community-driven rescue board where users can post urgent alerts for animals in need of immediate help.
* **🛒 Pet Marketplace:** An integrated e-commerce platform allowing users to buy and sell pet products, accessories, and food.

## 🛠️ Technology Stack

* **Frontend:** React.js, Context API/Redux (for state management), CSS/TailwindCSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT) & bcrypt for secure user login
* **Maps/Geolocation:** Google Maps API / Mapbox (for adoption point locations)

## 🚀 Getting Started

### Prerequisites

To run this project locally, make sure you have the following installed:
* [Node.js](https://nodejs.org/) (v16)
* [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas account)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/FurryFriends.git](https://github.com/yourusername/FurryFriends.git)
   cd FurryFriends
   ```

2. **Backend Setup:**
   Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup:**
   Open a new terminal window, navigate to the frontend directory, and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Variables:**
   Create a `.env` file in the `backend` root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   MAP_API_KEY=your_google_maps_or_mapbox_api_key
   ```

5. **Run the Application:**
   *Start the Backend server (from the backend folder):*
   ```bash
   npm run dev
   ```
   *Start the Frontend client (from the frontend folder):*
   ```bash
   npm start
   ```
   The application should now be running on `http://localhost:3000`.





## 👨‍💻 Author

Developed to connect pet enthusiasts and provide a centralized platform for animal welfare, adoptions, and care.
