const Video = require('../models/Video');
const cloudinary = require('../config/cloudinary').v2;
const streamifier = require('streamifier');
const mongoose = require('mongoose');

exports.uploadVideo = async (req, res) => {
  try {
    console.log('Upload request received from user:', req.user._id);
    
    if (!req.file) {
      return res.status(400).json({ error: "No video file provided" });
    }

    const video = await Video.create({
      title: req.body.title,
      description: req.body.description,
      videoUrl: req.file.path, // Cloudinary provides
      uploader: req.user._id,
      uploaderName: req.user.name
    });

    res.status(201).json({
      success: true,
      data: video
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Video upload failed',
      message: error.message
    });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .sort({ createdAt: -1 })
      .populate('uploader', 'name email');
    
    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};