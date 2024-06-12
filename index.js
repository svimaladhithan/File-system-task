import express from "express";
import fs from "fs";
import { format } from "date-fns";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let pathDirectory = path.join(__dirname, "TimeStamp");

app.get("/create", (req, res) => {
  let today = format(new Date(), "dd-MM-yyyy-HH-mm-ss");
  let filepath = `TimeStamp/${today}.txt`;
  fs.writeFileSync(filepath, `${today}`, "utf-8");
  res.status(200).send(`${today}.txt`);
});

app.get("/read", (req, res) => {
  let textfile = [];
  fs.readdir(pathDirectory, (err, files) => {
    files.forEach((ele) => {
      textfile.push(ele);
    });
    res.status(200).send(textfile.join(""));
  });
});
app.listen(PORT, () => {
  console.log(`App=${PORT}`);
});
