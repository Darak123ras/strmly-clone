const cloudinary = require('cloudinary').v2;

// Validate configuration
if (!process.env.CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Missing Cloudinary configuration');
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


module.exports = cloudinary;




















// const cloudinary = require('cloudinary').v2;
// // const { CloudinaryStorage } = require('multer-storage-cloudinary');
// // Validate configuration
// if (!process.env.CLOUDINARY_CLOUD_NAME || 
//     !process.env.CLOUDINARY_API_KEY || 
//     !process.env.CLOUDINARY_API_SECRET) {
//   throw new Error('Missing Cloudinary configuration');
// }
// // Configure with your actual credentials from Cloudinary Dashboard
// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,

// });
// // Test the connection
// // cloudinary.api.ping((error, result) => {
// //   if (error) console.error('Cloudinary connection error:', error);
// //   else console.log('Cloudinary connection successful:', result);
// // });

// // const storage = new CloudinaryStorage({
// //   cloudinary: cloudinary,
// //   params: {
// //     folder: 'strmly-videos',
// //     resource_type: 'video',
// //     allowed_formats: ['mp4', 'mov', 'avi'],
// //     format: 'mp4',
// //     chunk_size: 6000000 // 6MB chunks
// //   }
// // });
// // module.exports = cloudinary;

// module.exports = cloudinary;