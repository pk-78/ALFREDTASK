import Card from "../models/card.model.js";
import User from "../models/user.model.js";

export const deleteCard = async (req, res) => {
  const {id } = req.params;
  console.log(id)

  try {
    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res
      .status(200)
      .json({ message: "Card deleted successfully", card: deletedCard });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting card", error: error.message });
  }
};

export const updateBoxNumber = async (req, res) => {
  const { id, boxNumber } = req.body;
  console.log(id);

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { boxNumber },
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: "Error updating box number", error });
  }
};

export const addCardToUser = async (req, res) => {
  const { id, boxNumber, question, answer, reviewDate } = req.body;

  try {
    // Create a new card
    const newCard = new Card({
      boxNumber,
      question,
      answer,
      reviewDate,
    });

    await newCard.save();

    // Find user and update their cards list
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { cards: newCard._id } }, // Add card to user's cards array
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({
      message: "Card added successfully",
      card: newCard,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding card to user", error });
  }
};

export const getUserCards = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate("cards");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cards: user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user cards", error });
  }
};
