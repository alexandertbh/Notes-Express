const express = require("express");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");
const db = require("./db/db.json");

const PORT = 3005;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json);

// app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to the home page");
  //   res.sendFile(path.join(__dirname, "./public/index.html"));
});
// app.get("/api/notes", (req, res) => res.json(db));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  console.log("get all notes");
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ msg: "error reading db" });
    } else {
      const dataArr = JSON.parse(data);
      return res.json(dataArr);
    }
  });
});

app.post("/api/notes", (req, res) => {
  console.info("post recieved to add notes");
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ msg: "error reading db" });
    } else {
      const dataArr = JSON.parse(data);
      const { id, title, text } = req.body;
      if (title && text) {
        const newNote = {
          id: uuid.v4(),
          title: req.body.title,
          text: req.body.text,
        };
        console.log(newNote);
        dataArr.push(newNote);
      }
      fs.writeFile("../db/db.json", JSON.stringify(dataArr, null, 4), (err) => {
        if (err) {
          return res.status(500).json({ msg: "error writing db" });
        } else {
          return res.json(newNote);
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
