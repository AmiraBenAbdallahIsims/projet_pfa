const User = require('../models/User');
const Card = require('../models/Card');
const jwt = require('jsonwebtoken');
const jwtSecret = 'amira_web';
const multer = require('multer');
const { storage } = require('../cloudinary/cloudinary');
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 }, timeout: 120000 });



exports.getClients = async (req, res) => {
    const clients = await User.find({ role: "client" });
    return res.json({ clients: clients })
}

exports.createCard = async (req, res) => {
    const data = req.body;
    const user = await User.findOne({ _id: req.headers['userid'] });

    const newCard = new Card({
        cardName: data.templateName,
        clientId: data.client.value,
        cardDesign: data.data,
        designerId: user._id
    })

    await newCard.save();

    res.json({
        card: newCard,
        success: true
    });
}

exports.getProjects = async (req, res) => {
    const user = await User.findOne({ _id: req.headers['userid'] });
    console.log(user);
    if (user.role == "designer") {
        const cards = await Card.find({ designerId: user._id });
        console.log(cards);
        return res.json(cards);
    } else if (user.role == "client") {
        const cards = await Card.find({ clientId: user._id });
        console.log(cards);
        return res.json(cards);
    }
}
exports.uploadImage = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).send('Multer error: ' + err.message);
        } else if (err) {
            return res.status(500).send('Internal Server Error: ' + err.message);
        }

        if (req.file && allowedMimeTypes.includes(req.file.mimetype)) {
            try {
                console.log('jawk mrigl')
                return res.json({ url: req.file.path });
            } catch (uploadError) {
                return res.status(500).send('Image upload failed: ' + uploadError.message);
            }
        } else {
            return res.status(400).send('Invalid file type. Please upload a valid file.');
        }
    });
};


exports.checkCreatedTemplate = async (req, res) => {
    const templateId = req.params.templateid;
    const templateIdHeader = req.headers['templateid'];
    if (templateId == templateIdHeader && templateId.length == 24) {
        const card = await Card.findOne({ _id: templateId });
        if (card) {
            res.json({
                success: true,
                card: card
            });
        } else {
            res.json({
                success: false
            })
        }
    }
}

exports.updateCard = async (req, res) => {
    console.log('fl update');
    const templateId = req.params.templateid;
    const templateIdHeader = req.headers['templateid'];
    console.log(templateId , templateIdHeader)
    if (templateId == templateIdHeader && templateId.length == 24) {
        const data = req.body;
        const user = await User.findOne({ _id: req.headers['userid'] });
        const card = await Card.findOne({ _id: templateId });
        if (card && (user._id == card.clientId || user._id == card.designerId)) {
            card.cardName = data.templateName;
            card.cardDesign = data.data;

            await card.save();

            res.json({
                card: card,
                success: true
            });
        }else{console.log("fl if thenya")}

    }else{
        console.log('fl if loula')
    }
}