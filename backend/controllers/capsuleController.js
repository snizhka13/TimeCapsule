const Capsule = require("../models/Capsule");
const { encrypt, decrypt } = require("../utils/encryption");

exports.createCapsule = async (req, res) => {
  try {
    const { title, message, openDate } = req.body;

    const encryptedMessage = encrypt(message);
    const localDate = new Date(openDate);

    const capsule = new Capsule({
      userId: req.user.id,
      title,
      encryptedMessage,
      openDate: localDate
    });

    await capsule.save();
    console.log("Saved:", new Date(openDate).toISOString());
    res.status(201).json(capsule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCapsules = async (req, res) => {
  try {
    const capsules = await Capsule.find({ userId: req.user.id })
      .sort({ openDate: 1 });

    res.json(capsules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.openCapsule = async (req, res) => {
  try {
    const capsule = await Capsule.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!capsule)
      return res.status(404).json({ message: "Capsule not found" });

    if (new Date() < new Date(capsule.openDate))
      return res.status(403).json({ message: "Capsule is still locked" });

    const decryptedMessage = decrypt(capsule.encryptedMessage);

    res.json({
      title: capsule.title,
      message: decryptedMessage,
      openDate: capsule.openDate
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

