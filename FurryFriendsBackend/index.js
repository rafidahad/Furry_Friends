import express from "express";
import mongoose from "mongoose";
import "dotenv/config"; // Works if using ESM (type: "module" in package.json)

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

console.log("DB_URL:", DB_URL); // Add these to debug
console.log("PORT:", PORT);

mongoose
  .connect(DB_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(`Error connecting to Database ${err}`));

const app = express();
app.get("/", (req, res) => {
  res.status(200).json({ message: "THIS IS API" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
