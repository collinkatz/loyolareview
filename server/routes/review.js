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
    let results = await collection.find({}).sort({date_created: -1}).toArray();
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

router.patch("/:id", async (req, res) => {
  try {
    let updateData = {};
    if (req.body.title) {
      updateData.title = req.body.title;
    }
    if (req.body.body) {
      updateData.body = req.body.body;
    }
    if (req.body.rating) {
      updateData.rating = req.body.rating;
    }

    let collection = await db.collection("reviews");
    let result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData },
      { upsert: false }
    );

    if (result.matchedCount === 0) {
      res.status(404).send("Review not found");
    } else if (result.modifiedCount === 0) {
      res.status(204).send();
    } else {
      res.status(200).send("Review updated successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding review");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let collection = await db.collection("reviews");
    if (req.params.id !== undefined) {
      let query = { _id: new ObjectId(req.params.id) };
      let result = await collection.deleteOne(query);
  
      if (result.deletedCount === 0) {
        res.status(404).send("Not found");
      } else {
          res.status(200).send("Review deleted successfully");
      }
    } else {
      res.status(400).send("Review ID is required");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting review");
  }
});

router.post("/image/:reviewId", upload.single('image'), async (req, res) => {
  try {
    // req.file contains information about the uploaded file
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const fileName = req.file.filename;
    // let newImage = {
    //   name: fileName
    // };
    // let imageCollection = await db.collection("images");
    // let imageResult = await imageCollection.insertOne(newImage);

    // Now add image id into our review
    let reviewCollection = await db.collection("reviews");
    let reviewQuery = { _id: new ObjectId(req.params.reviewId) };
    let updateReview = { $push: { image_names: fileName }};
    let reviewResult = await reviewCollection.updateOne(reviewQuery, updateReview);

    res.status(200).send({
      // "image": imageResult,
      "review": reviewResult
    });
  } catch (err) {
    console.error(err);
  }
});

export default router;