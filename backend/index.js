import express from "express";
import bodyParser from "body-parser";

// index.js
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/", (res, req) => {
//   //   resolve.send("Hello world");
//   res.end("Hello world");
// });

app.post("/", async (req, res) => {
  const { key, email } = req.body;
  console.log(key, email);
  res.send("Hello world");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
