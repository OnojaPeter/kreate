const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
  }
});

const upload = multer({ 
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit (in bytes)
    storage: storage 
});

module.exports = upload;
