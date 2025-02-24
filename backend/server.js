import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRoute from "./routes/user.routes.js";
import cardRoute from "./routes/cards.routes.js";

const app = express();

dotenv.config();
const port = process.env.PORT;

// DB connection
connectDB();

app.use(express.json());

app.use(cors());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/card", cardRoute)

app.get("/", (req, res) => {
  return res.send("hello");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
