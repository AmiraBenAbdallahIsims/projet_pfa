const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dovuzhi0q',
    api_key: '229722515223379',
    api_secret: 'o393JCgNCte6TK6tNXWjTURn8cY'
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Users',
        public_id: (req, file) => file.originalname,
        resource_type: 'auto',
        allowedFormats: ['jpeg', 'png', 'jpg' ]
    },
});

module.exports = {
    cloudinary,
    storage
};