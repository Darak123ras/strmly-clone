const express = require('express');
const { protect } = require('../middleware/auth');
const { getVideos, uploadVideo } = require('../controllers/videoController');
const upload = require('../config/multer');

const router = express.Router();
// GET all videos
router.get('/', getVideos);


// Debug middleware 
router.use((req, res, next) => {
  console.log('Request received at:', new Date().toISOString());
  next();
});

router.post('/upload', 
  protect,
  upload.single('video'),
  uploadVideo
);

module.exports = router;

