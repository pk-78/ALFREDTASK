import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference type
      ref: "Card", // Reference to Card model
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
