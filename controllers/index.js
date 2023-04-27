// const express = require("express");
// const path = require("path");
// const uuid = require("uuid");
// const app = express();
// const fs = require("fs");
// const db = require("../db/db.json");

// // app.get("/", (req, res) => {
// //   // res.send("Welcome to the home page")
// //   res.sendFile(path.join(__dirname, "../public/index.html"));
// // });
// app.get("/api/notes", (req, res) => res.json(db));

// app.get("/notes", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/notes.html"));
// });

// app.get("/api/notes", (req, res) => {
//   fs.readFile("../db/db.json", "utf-8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ msg: "error reading db" });
//     } else {
//       const dataArr = JSON.parse(data);
//       return res.json(dataArr);
//     }
//   });
// });

// app.post("/api/notes", (req, res) => {
//   fs.readFile("../db/db.json", "utf-8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ msg: "error reading db" });
//     } else {
//       const dataArr = JSON.parse(data);
//       const newText = {
//         id: uuid.v4(),
//         title: req.body.title,
//         text: req.body.text,
//       };
//       console.log(newText);
//       dataArr.push(newText);
//       fs.writeFile("../db/db.json", JSON.stringify(dataArr, null, 4), (err) => {
//         if (err) {
//           return res.status(500).json({ msg: "error writing db" });
//         } else {
//           return res.json(newShoe);
//         }
//       });
//     }
//   });
// });
