import express from 'express'
import cors from 'cors'
import multer from 'multer'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/x-verify'

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err))

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

const Verification = mongoose.model('Verification', verificationSchema)

// Configure Multer for local temporary storage (will upload to Cloudinary after)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'verification-' + uniqueSuffix + path.extname(file.originalname))
  }
})

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
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' })
    }

    const { username } = req.body
    const referenceId = Math.random().toString(36).substr(2, 9).toUpperCase()

    let videoUrl = req.file.path
    let cloudinaryPublicId = null

    // Upload to Cloudinary if configured
    if (process.env.CLOUDINARY_CLOUD_NAME && 
        process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name') {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          resource_type: 'video',
          folder: 'x-verifications',
          public_id: `verification-${Date.now()}`,
        })
        
        videoUrl = uploadResult.secure_url
        cloudinaryPublicId = uploadResult.public_id
        
        // Delete local file after successful upload to Cloudinary
        fs.unlinkSync(req.file.path)
        console.log('✅ Video uploaded to Cloudinary:', videoUrl)
      } catch (cloudinaryError) {
        console.error('⚠️ Cloudinary upload failed, using local storage:', cloudinaryError.message)
        // Continue with local storage if Cloudinary fails
      }
    } else {
      console.log('ℹ️ Cloudinary not configured, using local storage')
    }

    const verification = new Verification({
      friendUsername: username || 'unknown',
      videoPath: req.file.path,
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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📁 Uploads directory: ${path.join(__dirname, 'uploads')}`)
})
