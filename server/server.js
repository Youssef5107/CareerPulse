require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(
  cors({
    origin: "*",
  }),
);
const prisma = new PrismaClient();
app.use(express.json());

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
