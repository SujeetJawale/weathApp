![BE MY VOICE (1)-min](https://github.com/user-attachments/assets/83bebb03-b8e1-4cc5-a226-c11343349cd9)

# ForcastNow 🌤️  
### &nbsp;&nbsp;[🔗 Live Demo](https://weatherappreact-441809.uw.r.appspot.com/)

A modern, responsive **Weather App** built with **React** for the frontend and deployed on a cloud platform. This project was developed as the **final project for a course submission** and leverages real-time weather data from **Tomorrow.io API** to provide accurate weather forecasts.

## 🌟 Features

- **Real-Time Weather Data**: Fetches weather details using Tomorrow.io API.
- **Location-Based Search**: Users can search for weather using city names or their current location.
- **Dynamic Forecast Views**:
  - **Day View**: Displays weather conditions for the current day.
  - **Daily Temperature Chart**: Provides a graphical representation of temperature trends.
  - **Meteogram**: Hourly-based forecast for the next few days.
- **Favorites List**: Users can save and manage favorite cities for quick weather access.
- **Tweet Integration**: Share weather updates on **Twitter (X)** directly from the app.
- **Responsive UI**: Built with **Bootstrap** for a seamless experience across devices.

## 🛠️ Tech Stack

- **Frontend**: Typescript, Bootstrap
- **Backend**: Node.js, Express.js (Cloud Deployment)
- **APIs Used**:
  - Tomorrow.io API (Weather Data)
  - Google Maps API (Geolocation & Autocomplete)
  - IPinfo API (User Location)
  - HighCharts API (Data Visualization)
  - Twitter (X) API (Tweet Sharing)
- **Database**: MongoDB Atlas (For storing favorite locations)

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **React.js**
- **Typescript**
- **MongoDB Atlas Account** (for favorites feature)

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app

2. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install

3. **Set Up Environment Variables:**:
   ```int
   WEATHER_API_KEY=your_tomorrow_io_api_key
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   TWITTER_API_KEY=your_twitter_api_key
   MONGODB_API_KEY=your_mongodb_api_key

4. **Start the react app**:
   ```bash
   npm start

6. **Run the backend**:
   ```bash
    cd ../backend
    npm install
    node server.js

## 📌 Project Structure

### Frontend (React Typescript)
- **Pages**: `src/pages/`
- **Components**: `src/components/`
- **API Calls**: `src/api/`
- **Store (State Management)**: `src/store/`

### Backend (Node.js & Express)
- **server.js**
  - **Routes**: `routes/`
  - **Controllers**: `controllers/`
  - **Database (MongoDB)**: `models/`

---

## 🔥 Deployment

The app is deployed on **Google Cloud Platform (GCP) for scalable cloud hosting.

---

## 📚 What We Learned

- Implementing **AJAX and JSON** for asynchronous data retrieval.
- Working with **RESTful APIs** for real-time weather data.
- Integrating **Google Maps API** for geolocation services.
- Using **MongoDB Atlas** for storing user preferences in a NoSQL environment.
- Enhancing **UI/UX** with **Bootstrap & Responsive Design**.

---

