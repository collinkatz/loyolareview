import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

const upload = multer({ dest: '../data/images/' }); // This will store uploaded files in the 'uploads/' directory

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

    /* From https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express */
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) {
          return res.status(500).contentType("text/plain").end("Oops! Something went wrong!");      
        }
        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) {
          return res.status(500).contentType("text/plain").end("Oops! Something went wrong!");      
        }

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
    /* END stack overflow solution */

    let newImage = {
      path: targetPath
    };

    let collection = await db.collection("images");
    let result = await collection.insertOne(newImage);

    res.status(200).send(result);
  } catch (err) {

  }
});

export default router;