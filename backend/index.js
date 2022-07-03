const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const multer = require("multer");
const path = require("path");
const port = process.env.PORT || 8000;

// const router = express.Router();
// const morgan = require("morgan");

// routes
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const restaurantRoute = require("./routes/restaurants");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connectes to MongoDB!!!!");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

// middleware
app.use(express.json());
app.use(helmet());
// app.use(morgan("common"));

// multer - upload files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded!!!!!");
  } catch (error) {
    console.log(":( :( OOps " + error);
  }
});

//routes
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/restaurants", restaurantRoute);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(port, () => {
  console.log("connecteddddd");
});

// from the routs  ==> npm run dev
