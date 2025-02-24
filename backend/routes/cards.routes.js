import express from "express";
import {
  addCardToUser,
  deleteCard,
  getUserCards,
  updateBoxNumber,
} from "../controllers/card.controller.js";

const cardRoute = express.Router();

cardRoute.delete("/delete/:id", deleteCard);
cardRoute.get("/getcards/:id", getUserCards);
cardRoute.post("/addcard", addCardToUser);
cardRoute.put("/cardnumberchange", updateBoxNumber);

export default cardRoute;
