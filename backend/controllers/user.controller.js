import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import Card from "../models/card.model.js";

const SECRET_KEY = process.env.SECRET_KEY || "yourSecretKey";

export const createUser = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const cardsData = [
      {
        boxNumber: "1",
        question: "What is Node.js?",
        answer: "Node.js is a runtime environment for JavaScript.",
        reviewDate: new Date(),
      },
      {
        boxNumber: "1",
        question: "What is Mongoose?",
        answer: "Mongoose is an ODM library for MongoDB and Node.js.",
        reviewDate: new Date(),
      },
      {
        boxNumber: "1",
        question: "What is an Express middleware?",
        answer:
          "Middleware are functions that execute during the request-response cycle in Express.",
        reviewDate: new Date(),
      },
      {
        boxNumber: "1",
        question: "What is REST API?",
        answer:
          "REST API is an architectural style that uses HTTP methods to interact with resources.",
        reviewDate: new Date(),
      },
      {
        boxNumber: "1",
        question: "What is MongoDB?",
        answer:
          "MongoDB is a NoSQL database that stores data in JSON-like documents.",
        reviewDate: new Date(),
      },
      {
        boxNumber: "1",
        question: "What is JWT?",
        answer:
          "JWT (JSON Web Token) is a secure way to transmit information between parties as a JSON object.",
        reviewDate: new Date(),
      },
      {
        boxNumber: "1",
        question: "What is dotenv?",
        answer:
          "Dotenv is a module that loads environment variables from a .env file into process.env.",
        reviewDate: new Date(),
      },
      {
        boxNumber: "1",
        question: "What is async/await?",
        answer:
          "Async/await are JavaScript syntax to handle asynchronous operations in a clean way.",
        reviewDate: new Date(),
      },
      {
        boxNumber: "1",
        question: "What is CORS?",
        answer:
          "CORS (Cross-Origin Resource Sharing) is a mechanism to allow/restrict resources on a web server.",
        reviewDate: new Date(),
      },
      {
        boxNumber: "1",
        question: "What is npm?",
        answer:
          "npm (Node Package Manager) is the default package manager for Node.js.",
        reviewDate: new Date(),
      },
    ];
    const createdCards = await Card.insertMany(cardsData);

    const newUser = new User({
      userId,
      password,
      cards: createdCards,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: err.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res
      .status(400)
      .json({ message: "User ID and password are required." });
  }

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({ message: "Invalid User ID or Password." });
    }

    if (user.password === password) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(404).json({
        message: "Wrong userId or password",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
