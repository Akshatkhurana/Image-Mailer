# Image Mailer

## Overview
Image Mailer is a web-based application that allows users to request a specific number of images based on a keyword and receive them in a ZIP file via email. The application uses Goggle API to fetches images, compresses them, and emails them to the user.

## Features
- Users can input a **keyword**, specify the **number of images**, and provide their **email address**.
- The application fetches images from an external API based on the provided keyword.
- Images are compressed into a **ZIP file**.
- Uses **Goggle API** to fetch images.
- The ZIP file is sent to the user's email using an **email service**.

## Tech Stack
- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Email Service:** Nodemailer (or any other SMTP service)
- **Image Source:** Google API
- **File Compression:** `archiver` package in Node.js

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js
- npm

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Akshatkhurana/Image-Mailer
   cd Image-Mailer
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the backend server:
   ```sh
   cd backend
   node server.js
   ```

4. Start the frontend:
   ```sh
   cd frontend
   npm start
   ```

![Alt Text](images\p2.png)


## Usage
1. Enter a keyword, the number of images required, and your email address.
2. Click **Submit**.
3. The backend fetches images, creates a ZIP file, and emails it to the provided address.

## API Endpoints
- `POST /api/send-images`
  - **Request Body:**
    ```json
    {
      "keyword": "nature",
      "numImages": 5,
      "email": "example@mail.com"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Images sent successfully!"
    }
    ```

