// // import express from "express";
// // import bodyParser from "body-parser";
// // import nodemailer from "nodemailer";

// // // index.js
// // import cors from "cors";

// // const app = express();
// // app.use(cors());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));
// // app.use(bodyParser.json());

// // // app.get("/", (res, req) => {
// // //   //   resolve.send("Hello world");
// // //   res.end("Hello world");
// // // });
// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: "testuser.23462@gmail.com",
// //     pass: "xfhl hgez hpig apxc",
// //   },
// // });

// // // const transporter = nodemailer.createTransport({
// // //   host: "smtp.ethereal.email",
// // //   port: 587,
// // //   auth: {
// // //     user: "hailie40@ethereal.email",
// // //     pass: "VsdBtGHt8uNrx3p5nD",
// // //   },
// // // });

// // app.post("/", async (req, res) => {
// //   const { key, email } = req.body;
// //   console.log(key, email);

// //   const mailOptions = {
// //     from: "testuser.23462@gmail.com",
// //     to: email,
// //     subject: `Images for keyword: ${key}`,
// //     html: `<h1>Hello world</h1>`,
// //   };
// //   // await transporter.sendMail(mailOptions);
// //   await transporter.sendMail(mailOptions, (error, info) => {
// //     if (error) {
// //       return console.log(error);
// //     }
// //     console.log("Message sent: %s", info.messageId);
// //   });
// //   res.send("Hello world");
// // });

// // app.listen(5000, () => {
// //   console.log("Server is running on port 5000");
// // });

// import express from "express";
// import bodyParser from "body-parser";
// import nodemailer from "nodemailer";
// import { exec } from "child_process";
// import path from "path";
// import { fileURLToPath } from "url";
// import cors from "cors";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "testuser.23462@gmail.com",
//     pass: "xfhl hgez hpig apxc",
//   },
// });

// app.post("/", (req, res) => {
//   const { key, email } = req.body;
//   console.log(key, email);
//   const scriptPath = path.join(__dirname, "python.py");

//   exec(`python ${scriptPath} "${key}"`, (error, stdout, stderr) => {
//     if (error) {
//       console.log(Error`:${error.message}`);
//       return res.status(500).send({ Error: error.message });
//     }
//     if (stderr) {
//       console.log(Stderr`: ${stderr}`);
//       return res.status(500).send({ Error: error.message });
//     }
//     const zipPath = stdout.trim();
//     console.log(zipPath);

//     const mailOptions = {
//       from: "hailie40@ethereal.email",
//       to: email,
//       subject: `Images for keyword: ${key}`,
//       html: "<h1>Hello world</h1>",

//       attachments: [
//         {
//           path: zipPath,
//         },
//       ],
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(Error`: ${error.message}`);
//         return res.status(500).send(Error);
//       }
//       console.log("Message sent: %s", info.messageId);
//       res.send("Images sent successfully");
//     });
//   });
// });

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });

import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
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
    user: "mypersonaluser333@gmail.com",
    pass: "ynme rxju krad ibnz",
  },
});

app.post("/", (req, res) => {
  const { key, email, numImages } = req.body;
  console.log(`Received key: ${key}, email: ${email}, ${numImages}`);

  const scriptPath = path.join(__dirname, "python.py");
  const command = `python ${scriptPath} ${key} ${numImages}`;

  console.log(`Executing command: ${command}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error.message}`);
      return res.status(500).send({ Error: error.message });
    }
    if (stderr) {
      console.log(`Stderr: ${stderr}`);
      return res.status(500).send({ Error: stderr });
    }


    let result;
    try {
      result = JSON.parse(stdout.trim()); // Parsing JSON from Python script
    } catch (parseError) {
      console.log("Raw stdout:", stdout); // Helpful debug
      console.log(`Parse Error: ${parseError.message}`);
      return res.status(500).send({ Error: "Failed to parse Python script output" });
    }

    const { zip_path: zipPath, message } = result;

    // const zipPath = stdout.trim();
    console.log(`Zip file created at: ${zipPath}`);

    const mailOptions = {
      from: "testuser.23462@gmail.com",
      to: email,
      subject: `Images for keyword: ${key}`,
      html: "<div>PLEASE REFER TO ATTACHED ZIP FILE</div>",
      attachments: [
        {
          path: zipPath,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).send({ Error: error.message });
      }
      console.log("Message sent: %s", info.messageId);
      res.send({message: message || "Images sent successfully"});
    });
  });
});
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
