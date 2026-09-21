
const express = require("express");

const connectDb = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;


const app = express();
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

connectDb();
app.get("/", (req, res) => {
  res.send("Home page ");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
