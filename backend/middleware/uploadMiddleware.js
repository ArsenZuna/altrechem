const multer = require('multer');
const path = require('path');

// 1a. Where and how to store files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // e.g. put everything under /backend/uploads/products
    cb(null, path.join(__dirname, '../uploads/products'));
  },
  filename: function (req, file, cb) {
    // e.g. product-<timestamp>.<ext>
    const ext = path.extname(file.originalname);
    cb(null, `product-${Date.now()}${ext}`);
  }
});

// 1b. Only accept image files
function fileFilter(req, file, cb) {
  const allowed = /jpeg|jpg|png|gif/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
}

// 1c. Multer options
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

module.exports = upload;
