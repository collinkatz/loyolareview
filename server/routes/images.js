import express from "express";
import fs from "fs"
import path from "path"
import { config } from 'dotenv';
const result = config({ path: './config.env' });

const imagesDir ='./data/images/'
const placeholderImage = 'placeholder.png';

const router = express.Router();

router.get("/:imageName", async (req, res) => {
    const { imageName } = req.params;
    const filePath = path.join(imagesDir, imageName);
  
    // https://stackoverflow.com/questions/17699599/node-js-check-if-file-exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log("File not found");
            console.log(path.join(imagesDir, placeholderImage))
            res.sendFile(placeholderImage, { root: imagesDir });
        } else {
            console.log("File found");
            console.log(filePath)
            res.sendFile(imageName, { root: imagesDir });
        }
    });
});

export default router;