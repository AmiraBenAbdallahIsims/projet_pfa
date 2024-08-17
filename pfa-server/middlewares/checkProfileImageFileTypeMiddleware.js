const multer = require('multer');
const { storage } = require('../cloudinary/cloudinary');
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 }, timeout: 120000 });

const checkFileTypeMiddleware = (fieldName, allowedMimeTypes) => (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
        console.log(err);
        if (err instanceof multer.MulterError) {
            return next(err);
        } else if (err) {
            return res.status(500).send('Internal Server Error: ' + err.message);
        }

        if (req.file && allowedMimeTypes.includes(req.file.mimetype)) {
            next();
        } else {
            console.log(req.file)
            return res.status(400).send('Invalid file type. Please upload a valid file.');
        }
    });
};

const checkProfileImageFileTypeMiddleware = checkFileTypeMiddleware('image', allowedMimeTypes);

module.exports = {checkProfileImageFileTypeMiddleware };
