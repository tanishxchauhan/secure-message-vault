const Message = require("../models/Message");
const CryptoJS = require("crypto-js");

exports.saveMessage = async (req, res) => {
  try {
    const { text } = req.body;

    const encrypted = CryptoJS.AES.encrypt(
      text,
      process.env.ENCRYPTION_KEY
    ).toString();

    const message = new Message({
      userId: req.user.id,
      encryptedText: encrypted
    });

    await message.save();

    res.json(message);

  } catch (error) {
    res.status(500).json(error);
  }
};


exports.getMessages = async (req, res) => {
  const messages = await Message.find({
    userId: req.user.id
  });

  res.json(messages);
};


exports.decryptMessage = (req, res) => {
  const { cipher } = req.body;

  const bytes = CryptoJS.AES.decrypt(
    cipher,
    process.env.ENCRYPTION_KEY
  );

  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  res.json({ decrypted });
};