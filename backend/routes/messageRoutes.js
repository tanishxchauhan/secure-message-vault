const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  saveMessage,
  getMessages,
  decryptMessage
} = require("../controllers/messageController");

// DEBUG (important)
console.log(saveMessage, getMessages, decryptMessage);

router.post("/", auth, saveMessage);
router.get("/", auth, getMessages);
router.post("/decrypt", auth, decryptMessage);

module.exports = router;