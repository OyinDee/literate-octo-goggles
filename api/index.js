import express from 'express'
import cors from 'cors'
import multer from 'multer'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/x-verify'

let isConnected = false

const connectDB = async () => {
  if (isConnected) {
    return
  }
  
  try {
    await mongoose.connect(MONGODB_URI)
    isConnected = true
    console.log('✅ Connected to MongoDB')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
  }
}

// Verification Schema
const verificationSchema = new mongoose.Schema({
  friendUsername: {
    type: String,
    required: true
  },
  videoPath: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  cloudinaryPublicId: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: String,
  userAgent: String,
  referenceId: String
})

const Verification = mongoose.models.Verification || mongoose.model('Verification', verificationSchema)

// Configure Multer for memory storage (Vercel serverless)
const storage = multer.memoryStorage()

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
})

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'X Verification API is running',
    timestamp: new Date().toISOString()
  })
})

// Submit verification
app.post('/api/verify', upload.single('video'), async (req, res) => {
  try {
    await connectDB()

    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' })
    }

    const { username } = req.body
    const referenceId = Math.random().toString(36).substr(2, 9).toUpperCase()

    let videoUrl = ''
    let cloudinaryPublicId = null

    // Upload to Cloudinary (required for Vercel deployment)
    if (process.env.CLOUDINARY_CLOUD_NAME && 
        process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name') {
      try {
        // Upload buffer directly to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'video',
              folder: 'x-verifications',
              public_id: `verification-${Date.now()}`,
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(req.file.buffer)
        })
        
        videoUrl = uploadResult.secure_url
        cloudinaryPublicId = uploadResult.public_id
        
        console.log('✅ Video uploaded to Cloudinary:', videoUrl)
      } catch (cloudinaryError) {
        console.error('⚠️ Cloudinary upload failed:', cloudinaryError.message)
        return res.status(500).json({ error: 'Failed to upload video to cloud storage' })
      }
    } else {
      return res.status(400).json({ error: 'Cloudinary not configured. Please add credentials.' })
    }

    const verification = new Verification({
      friendUsername: username || 'unknown',
      videoPath: videoUrl,
      videoUrl: videoUrl,
      cloudinaryPublicId: cloudinaryPublicId,
      referenceId: referenceId,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    })

    await verification.save()

    res.json({
      success: true,
      message: 'Verification submitted successfully',
      referenceId: referenceId,
      verificationId: verification._id,
      videoUrl: videoUrl
    })
  } catch (error) {
    console.error('Verification error:', error)
    res.status(500).json({ 
      error: 'Failed to process verification',
      message: error.message 
    })
  }
})

// Get verification status
app.get('/api/verify/:referenceId', async (req, res) => {
  try {
    await connectDB()

    const verification = await Verification.findOne({ 
      referenceId: req.params.referenceId 
    })

    if (!verification) {
      return res.status(404).json({ error: 'Verification not found' })
    }

    res.json({
      referenceId: verification.referenceId,
      status: verification.status,
      friendUsername: verification.friendUsername,
      submittedAt: verification.submittedAt,
      videoUrl: verification.videoUrl
    })
  } catch (error) {
    console.error('Lookup error:', error)
    res.status(500).json({ error: 'Failed to lookup verification' })
  }
})

// Get all verifications (admin)
app.get('/api/verifications', async (req, res) => {
  try {
    await connectDB()

    const verifications = await Verification.find()
      .sort({ submittedAt: -1 })
      .limit(100)

    res.json({
      count: verifications.length,
      verifications: verifications
    })
  } catch (error) {
    console.error('Error fetching verifications:', error)
    res.status(500).json({ error: 'Failed to fetch verifications' })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  })
})

// Export for Vercel
export default app
