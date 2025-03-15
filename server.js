import "dotenv/config";

import express from "express"
import cors from "cors"
import { connectToMongoDb } from "./config/dbConfig.js";
import userRouter from "./routers/userRouter.js";
import bookRouter from "./routers/bookRouter.js";

const app = express()
const PORT = process.env.PORT || 8000

// Middlewares
app.use(cors())
app.use(express.json())

// Connect to db
connectToMongoDb()


// Serve Images to Client
import path from "path"
const __dirname = path.resolve();
console.log("__dirname", __dirname);

app.use(express.static(path.join(__dirname, "/public")))

// Routers
app.use('/api/v1/users', userRouter)
app.use('/api/v1/books', bookRouter)

// Start Server
app.listen(PORT, (error) => {
  error ? console.log("Error", error) : console.log("Server is running")
})