import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

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
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testuser.23462@gmail.com",
    pass: "xfhl hgez hpig apxc",
  },
});

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "hailie40@ethereal.email",
//     pass: "VsdBtGHt8uNrx3p5nD",
//   },
// });

app.post("/", async (req, res) => {
  const { key, email } = req.body;
  console.log(key, email);

  const mailOptions = {
    from: "hailie40@ethereal.email",
    to: email,
    subject: `Images for keyword: ${key}`,
    html: `<h1>Hello world</h1>`,
  };
  // await transporter.sendMail(mailOptions);
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
  res.send("Hello world");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
