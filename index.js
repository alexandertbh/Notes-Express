const express = require("express");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");
const db = require("./db/db.json");

const app = express();
const PORT = 3005;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  // res.send("Welcome to the home page");
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

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
          title: req.body.title,
          text: req.body.text,
          id: uuid.v4(),
        };
        console.log(newNote);
        dataArr.push(newNote);
      }
      fs.writeFile("./db/db.json", JSON.stringify(dataArr, null, 4), (err) => {
        if (err) {
          return res.status(500).json({ msg: "error writing db" });
        } else {
          return res.json(dataArr);
        }
      });
    }
  });
});

app.get("/api/notes/:notesID", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ msg: "error reading db" });
    } else {
      const notes = JSON.parse(data);
      const notesID = req.params.notesID;
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == notesID) {
          return res.json(notes[i]);
        }
      }
      return res.status(404).json({
        msg: "no such sneaker!",
      });
    }
  });
});

app.listen(process.env.PORT || 3005, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
