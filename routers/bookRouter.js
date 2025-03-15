import express from "express"
import { buildErrorResponse, buildSuccessResponse } from "../utility/responseHelper.js"
import { createBook, getAllBooks, updateBookById } from "../model/bookModel.js"
import { userAuth } from "../middlewares/authMiddleware.js"
import { newBookValidation } from "../middlewares/newBookValidationMiddleware.js"
import { thumbnailUploader } from "../middlewares/thumbnailUploader.js"

const bookRouter = express.Router()

// Public routes
// GET all books
bookRouter.get("/", async(req, res) => {
  try {
    const books = await getAllBooks()

    books?.length
      ? buildSuccessResponse(res, books, "All Books")
      : buildErrorResponse(res, "No books available")
  } catch (error) {
    buildErrorResponse(res, "No books available")
  }
})

// CREATE | Private Route - only admin can create book
bookRouter.post("/", userAuth, newBookValidation, async(req, res)=>{
  try {
    const currentUser = req.userInfo

    // user is not admin
    if(currentUser.role !== "admin"){
      return buildErrorResponse(res, "Not authorized to create book")
    }

    // if user is admin
    const book = await createBook(req.body)

    book?._id
      ? buildSuccessResponse(res, book, "Book created Successfully")
      : buildErrorResponse(res, "Unable to create a book")
  } catch (error) {
    if(error.code === 11000){
      error.message = "There is another book that has similar ISBN. Plase change the isbn and try again"
    }
    buildErrorResponse(res, error.message )
  }
})

// UPDATE | Private Route - only admin can create book
// newBookValidation will be replaced by updateBookValidation
bookRouter.patch("/", userAuth, thumbnailUploader.single('image'),async(req, res)=>{
  try {
    const currentUser = req.userInfo

    // user is not admin
    if(currentUser.role !== "admin"){
      return buildErrorResponse(res, "Not authorized to update book")
    }

    // Check if we have to upload a thumbnail for book
    // process the req once upload is done using thumbnailUploader
    if(req.file){
      req.body.thumbnail = req.file.path.slice(6)
    }
    // if user is admin
    const book = await updateBookById(req.body)

    book?._id
      ? buildSuccessResponse(res, book, "Book updated Successfully")
      : buildErrorResponse(res, "Unable to update a book")
  } catch (error) {
    if(error.code === 11000){
      error.message = "There is another book that has similar ISBN. Plase change the isbn and try again"
    }
    buildErrorResponse(res, error.message )
  }
})

export default bookRouter