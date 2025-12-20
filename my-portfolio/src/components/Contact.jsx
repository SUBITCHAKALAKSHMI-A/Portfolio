import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaUser, FaEnvelope, FaComment, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Backend API URL (update with your deployed backend URL)
  const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-api.com/api/contact' 
    : 'http://localhost:5000/api/contact';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      
      // More detailed error handling
      if (err.response) {
        // Server responded with error status
        const errorMessage = err.response.data?.error || err.response.data?.message || 'Server error occurred';
        setError(errorMessage);
      } else if (err.request) {
        // Request was made but no response received
        console.error('No response from server:', err.request);
        setError('Cannot connect to server. Please make sure the backend is running on port 5000.');
      } else {
        // Error setting up the request
        console.error('Request setup error:', err.message);
        setError(err.message || 'Failed to send message. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-section" id="contact">
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Get In Touch</h2>
      </motion.div>
      
      <div className="contact-container">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>Contact Information</h3>
          <div className="contact-details">
            <div className="detail-item">
              <div className="detail-icon">
                <FaEnvelope />
              </div>
              <div className="detail-content">
                <h4>Email</h4>
                <span>subikshakalakshmiarumugam@gmail.com</span>
              </div>
            </div>
            
            
            
            <div className="detail-item">
              <div className="detail-icon">
                <FaUser />
              </div>
              <div className="detail-content">
                <h4>Location</h4>
                <span>Perundurai, Erode, Tamil Nadu</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="contact-form-container"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3>Send Me a Message</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="textarea-with-icon">
                <FaComment className="input-icon" />
                <textarea
                  name="message"
                  placeholder="Your Message Here..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <FaPaperPlane /> Send Message
                </>
              )}
            </motion.button>
            
            {error && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FaExclamationCircle /> {error}
              </motion.div>
            )}
            
            {submitted && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <FaCheckCircle /> Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;