const mongoose = require("mongoose");

const capsuleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  encryptedMessage: String,
  openDate: Date,
}, { timestamps: true });

module.exports = mongoose.model("Capsule", capsuleSchema);
