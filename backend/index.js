// import express, { text } from "express";
// import bodyParser from "body-parser";
// import nodemailer from "nodemailer";
// import { exec }from "child_process";
// import path from "path";
// import { fileURLToPath } from 'url';

// // index.js
// import cors from "cors";
// import { error } from "console";
// import { stderr, stdout } from "process";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // app.get("/", (res, req) => {
// //   //   resolve.send("Hello world");
// //   res.end("Hello world");
// // });
// let zipPath;
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "testuser.23462@gmail.com",
//     pass: "xfhl hgez hpig apxc",
//   },
// });

// // const transporter = nodemailer.createTransport({
// //   host: "smtp.ethereal.email",
// //   port: 587,
// //   auth: {
// //     user: "hailie40@ethereal.email",
// //     pass: "VsdBtGHt8uNrx3p5nD",
// //   },
// // });

// app.post("/", async (req, res) => {
//   const { key, email } = req.body;
//   console.log(key, email);
//   const scriptPath = path.join( __dirname,'python.py');
//   exec(`python3 ${scriptPath} ${key}`,(error,stdout,stderr) => {
//     if(error) {
//       console.log(`Error: ${error.Message}`);
//       return res.status(500).send(`Error in downloading in images`);
//     }
//     if(stderr) {
//       console.log(`Stderr: ${stderr}`);
//       return res.status(500).send(`Error in downloading images`);
//     }
//     console.log(stdout);
//     zipPath = stdout.trim();
//   })

//   const mailOptions = {
//     from: "hailie40@ethereal.email",
//     to: email,
//     subject: `Images for keyword: ${key}`,
//     html: `<h1>Hello world</h1>`,
//     attachments : [
//       {
//         path: zipPath
//       }
//     ]
//   };
//   // await transporter.sendMail(mailOptions);
//   await transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log("Message sent: %s", info.messageId);
//   });
//   res.send({});
// });

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });









import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testuser.23462@gmail.com",
    pass: "xfhl hgez hpig apxc",
  },
});

app.post("/", (req, res) => {
  const { key, email } = req.body;
  console.log(key, email);
  const scriptPath = path.join(__dirname, 'python.py');
  
  exec(`python ${scriptPath} ${key}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error.message}`);
      return res.status(500).send(`Error in downloading images`);
    }
    if (stderr) {
      console.log(`Stderr: ${stderr}`);
      return res.status(500).send(`Error in downloading images`);
    }
    const zipPath = stdout.trim();
    console.log(zipPath);
    

    const mailOptions = {
      from: "hailie40@ethereal.email",
      to: email,
      subject: `Images for keyword: ${key}`,
      html: `<h1>Hello world</h1>`,
      
      attachments: [
        {
          path: zipPath
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).send(`Error in sending email`);
      }
      console.log("Message sent: %s", info.messageId);
      res.send('Images sent successfully');
    });
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
