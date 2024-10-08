# Image Processing System

This project consists of two main components: a main application for processing images from CSV files, and a webhook receiver for handling notifications.

## Project Structure

image-processing-system/
├── main-app/
│ └── (main application files)
├── webhook/
│ └── (webhook receiver files)
└── README.md

## Prerequisites

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- MongoDB
- RabbitMQ

## Setup

1. Clone the repository:
   git clone https://github.com/rohan492/image-processing-system.git
   cd image-processing-system

2. Set up environment variables:
   Create a .env file in both the main-app and webhook directories with the following contents (adjust as needed):

   For main-app/.env:
   PORT=3000
   MONGODB_URI=mongodb://localhost/image_processing_system
   RABBITMQ_URL=amqp://localhost
   WEBHOOK_URL=http://localhost:3001/webhook

   For webhook/.env:
   PORT=3001

3. Install dependencies and start each application:

   For the main app:
   cd main-app
   npm install
   npm start

   For the webhook receiver (in a new terminal):
   cd webhook
   npm install
   npm start

4. The main application will be running at http://localhost:3000 and the webhook receiver at http://localhost:3001.

## Running Tests

To run tests for the main application:

cd main-app
npm test

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
