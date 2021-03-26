const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

app.set("view engine", "ejs");

// Database
const connectionString = process.env.connectionString;
console.log(connectionString);
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");
    // Middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static("public"));
    app.get("/", (req, res) => {
      console.log(req);
      //   res.send("Hello World!");
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => res.render("index.ejs", { quotes: results }));
      // console.log(cursor);
      // res.render("index.ejs", {});
      // res.sendFile(__dirname + "/index.html");
    });
    app.get("/:id", (req, res) => {
      console.log(req);
      //   res.send("Hello World!");
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => res.render("index.ejs", { quotes: results }));
      // console.log(cursor);
      // res.render("index.ejs", {});
      // res.sendFile(__dirname + "/index.html");
    });
    app.put("/quotes", (req, res) => {
      console.log(req.body);
      quotesCollection
        .findOneAndUpdate(
          { name: "Name Var" },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          res.json("Success");
        })
        .catch((error) => console.error(error));
    });
    app.post("/quotes", (req, res) => {
      console.log(req.body);
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });
    app.delete("/quotes", (req, res) => {
      quotesCollection
        .deleteOne({ name: req.body.name })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.json("No quote to delete");
          }
          res.json(`Deleted Darth Vadar's quote`);
        })
        .catch((error) => console.error(error));
    });

    app.listen(3000, function () {
      console.log("Listening on 3000");
    });
  })
  .catch((err) => console.error(error));
