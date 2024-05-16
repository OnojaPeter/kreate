const multer = require('multer');

function handleMulterErrors(err, req, res, next) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send('File size limit exceeded (max 5MB)');
      }
      // Handle other multer errors as needed
    }
    next(err);
}
  
module.exports = handleMulterErrors;