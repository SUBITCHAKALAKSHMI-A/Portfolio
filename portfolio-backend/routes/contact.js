// portfolio-backend/routes/contact.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Contact = require('../models/Contact');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/auth');

// @desc    Submit contact form (PUBLIC - anyone can submit)
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
  try {
    console.log('📥 Contact form submission received:', {
      body: req.body,
      headers: req.headers['content-type'],
      ip: req.ip,
      timestamp: new Date().toISOString()
    });

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields'
      });
    }

    // Generate unique JWT token for this feedback
    const feedbackPayload = {
      name,
      email,
      message: message.substring(0, 100), // Store first 100 chars in token
      submittedAt: new Date().toISOString()
    };

    const feedbackToken = jwt.sign(
      feedbackPayload,
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      {
        expiresIn: process.env.JWT_EXPIRE || '365d' // Token valid for 1 year
      }
    );

    // Get IP address and user agent for tracking
    const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const userAgent = req.get('user-agent');

    // Save to database with JWT token
    const contact = await Contact.create({
      name,
      email,
      message,
      jwtToken: feedbackToken,
      ipAddress,
      userAgent
    });

    // Optional: Send email notification to admin
    // await sendEmailNotification(contact);

    res.status(201).json({
      success: true,
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        message: contact.message,
        jwtToken: contact.jwtToken,
        createdAt: contact.createdAt
      },
      message: 'Thank you for your message! I will get back to you soon.',
      token: feedbackToken // Return token to client
    });

  } catch (error) {
    console.error('Contact form error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack
    });
    
    // Handle duplicate token error (unlikely but possible)
    if (error.code === 11000 && error.keyPattern?.jwtToken) {
      console.error('Duplicate JWT token detected, this should not happen');
      return res.status(500).json({
        success: false,
        error: 'Duplicate submission detected. Please try again.'
      });
    }
    
    // Handle MongoDB connection errors
    if (error.name === 'MongoServerError' || error.name === 'MongoNetworkError') {
      console.error('MongoDB connection error:', error.message);
      return res.status(503).json({
        success: false,
        error: 'Database connection error. Please try again later.'
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message).join(', ');
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    // Default error response
    res.status(500).json({
      success: false,
      error: error.message || 'Server Error. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// @desc    Admin login
// @route   POST /api/contact/admin/login
// @access  Public
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    // Check if admin exists
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordMatch = await admin.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Create token
    const token = admin.getJWTToken();

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email
      },
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Get all contact messages (PROTECTED - only admin)
// @route   GET /api/contact/admin/messages
// @access  Private
router.get('/admin/messages', protect, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).select('-__v');

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages.map(msg => ({
        _id: msg._id,
        name: msg.name,
        email: msg.email,
        message: msg.message,
        status: msg.status,
        jwtToken: msg.jwtToken,
        tokenExpires: msg.tokenExpires,
        ipAddress: msg.ipAddress,
        userAgent: msg.userAgent,
        createdAt: msg.createdAt
      }))
    });

  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Update message status (PROTECTED - only admin)
// @route   PUT /api/contact/admin/messages/:id
// @access  Private
router.put('/admin/messages/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;
    
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      data: message
    });

  } catch (error) {
    console.error('Update message error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Delete message (PROTECTED - only admin)
// @route   DELETE /api/contact/admin/messages/:id
// @access  Private
router.delete('/admin/messages/:id', protect, async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });

  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Verify feedback JWT token
// @route   POST /api/contact/verify-token
// @access  Public
router.post('/verify-token', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'Token is required'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');

    // Check if feedback exists in database
    const contact = await Contact.findOne({ jwtToken: token });

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        message: contact.message,
        status: contact.status,
        createdAt: contact.createdAt,
        tokenInfo: decoded
      },
      message: 'Token verified successfully'
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token has expired'
      });
    }

    console.error('Verify token error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Initialize admin (RUN THIS ONCE)
// @route   POST /api/contact/admin/init
// @access  Public (Disable after first use!)
router.post('/admin/init', async (req, res) => {
  try {
    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (adminExists) {
      return res.status(400).json({
        success: false,
        error: 'Admin already exists'
      });
    }

    // Create admin with credentials from .env
    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });

    res.status(201).json({
      success: true,
      message: 'Admin created successfully. You can now login.'
    });

  } catch (error) {
    console.error('Init admin error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;