# X Face Verification App

A full-stack face verification application styled like X (Twitter) that helps users verify their identity to unlock their friend's account.

## 🎯 Features

- **X-Themed UI**: Authentic X (Twitter) design with black theme
- **Video Recording**: Record 10-second face verification videos
- **Real-time Camera**: Access user's camera for live verification
- **Video Upload**: Save videos to backend with MongoDB integration
- **Friend Verification**: Help unlock your friend's account through identity verification
- **Status Tracking**: Reference ID system to track verification status

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Vite
- Axios
- MediaStream API (getUserMedia)

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- Multer (file uploads)
- CORS

## 📦 Installation

1. **Install root dependencies:**
```bash
npm run install-all
```

Or manually install for each:

2. **Install client dependencies:**
```bash
cd client
npm install
```

3. **Install server dependencies:**
```bash
cd server
npm install
```

## 🚀 Running the App

### Start both client and server:
```bash
npm run dev
```

### Or run separately:

**Frontend (Port 3000):**
```bash
cd client
npm run dev
```

**Backend (Port 5000):**
```bash
cd server
npm run dev
```

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The app will connect to `mongodb://localhost:27017/x-verify`

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `server/.env` with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/x-verify
```

## 📁 Project Structure

```
xclone/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── VerificationStart.jsx
│   │   │   ├── VideoVerification.jsx
│   │   │   └── Success.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                # Node.js backend
│   ├── uploads/          # Uploaded videos storage
│   ├── server.js         # Express server
│   ├── .env              # Environment variables
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## 🎥 How It Works

1. **Landing Page**: User lands on X-styled homepage
2. **Start Verification**: Click "Help Friend Unlock Account"
3. **Enter Username**: Enter friend's X username
4. **Record Video**: Camera opens, user records 10-second verification video
5. **Submit**: Video is uploaded to backend and saved to MongoDB
6. **Success**: User receives reference ID for tracking

## 🔐 Security Features

- Video file type validation
- 50MB file size limit
- CORS protection
- MongoDB data persistence
- IP address and User-Agent logging
- Reference ID tracking system

## 🌐 API Endpoints

- `GET /api/health` - Health check
- `POST /api/verify` - Submit verification video
- `GET /api/verify/:referenceId` - Check verification status
- `GET /api/verifications` - Get all verifications (admin)

## 📱 Browser Requirements

- Modern browser with MediaStream API support
- Camera permissions enabled
- WebRTC support for video recording

## 🎨 UI Screens

1. **Home** - X landing page with authentication options
2. **Verification Start** - Explanation and friend username input
3. **Video Recording** - Live camera feed with recording controls
4. **Success** - Confirmation with reference ID

## 📝 Environment Variables

Create `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/x-verify
```

## 🤝 Contributing

This is a practice project for learning face verification, video recording, and database integration.

## 📄 License

ISC

---

**Note**: This is a practice/learning project. The verification flow is for educational purposes.
