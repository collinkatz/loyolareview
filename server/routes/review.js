import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { config } from 'dotenv';
const result = config({ path: './config.env' });

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.env.IMAGE_STORAGE_DIR)
    },
    filename: function (req, file, cb) {
      /* From https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer */
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      /* End Stack Overflow Solution */
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + "." + extension // TODO: Likely want to verify its png or jpg
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("reviews");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting reviews");
  }
});

router.get("/:id", async (req, res) => {
    try {
      let collection = await db.collection("reviews");
      if (req.params.id !== undefined) {
          let query = { _id: new ObjectId(req.params.id) };
          let result = await collection.findOne(query);
      
          if (!result) res.send("Not found").status(404);
          else res.send(result).status(200);
      } else {
          let result = await collection.find({});
          res.send(result).status(200);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error getting review");
    }
  });

router.post("/", async (req, res) => {
    try {
        let newReview = {
          title: req.body.title,
          body: req.body.body,
          rating: req.body.rating,
          date_created: new Date(),
          image_ids: []
        };
        let collection = await db.collection("reviews");
        let result = await collection.insertOne(newReview);
        res.send(result).status(204);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error adding review");
      }
});

router.post("/image/:reviewId", upload.single('image'), async (req, res) => {
  try {
    // req.file contains information about the uploaded file
    if (!req.file) {
      // If no file is uploaded, return an error response
      return res.status(400).send('No file uploaded.');
    }

    const fileName = req.file.filename;

    let newImage = {
      name: fileName
    };

    let collection = await db.collection("images");
    let result = await collection.insertOne(newImage);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
  }
});

export default router;