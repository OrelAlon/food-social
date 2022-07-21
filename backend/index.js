const express = require("express");
const fileupload = require("express-fileupload");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
// const multer = require("multer");
const path = require("path");
const port = process.env.PORT || 8000;

// routes
// const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const restaurantRoute = require("./routes/restaurants");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connectes to MongoDB!!!!");
});

app.use("/upload", express.static(path.join(__dirname, "/public/upload")));

// file-upload - upload files
app.use(fileupload());

app.post("/api/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "no file!" });
  }

  const file = req.files.file;
  file.mv(`${__dirname}/public/upload/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
  res.json({ fileName: file.name, filePath: `/public/upload/${file.name}` });
});

// middleware
app.use(express.json());
app.use(helmet());

// end-point
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/restaurants", restaurantRoute);

// Serve frontend for heroku
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
