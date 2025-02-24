import mongoose from "mongoose";

const cardSchema = mongoose.Schema(
  {
    boxNumber: {
      type: String,
      required: true,
      unique: false,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    reviewDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;
