import "dotenv/config";

import express from "express"
import cors from "cors"
import { connectToMongoDb } from "./config/dbConfig.js";

const app = express()
const PORT = process.env.PORT || 8000

// Middlewares
app.use(cors())
app.use(express.json())

// Connect to db
connectToMongoDb()

// Routers

// Start Server
app.listen(PORT, (error) => {
  error ? console.log("Error", error) : console.log("Server is running")
})