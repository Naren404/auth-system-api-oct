import bookModel from "../schema/bookSchema.js";

// Get all books which are available
export const getAllBooks = () => {
  return bookModel.find();
};

//Create
export const createBook = (bookObj) => {
  return bookModel(bookObj).save();
};

//update book
export const updateBookById = (updatedBookObj) => {
  const { id } = updatedBookObj
  return bookModel.findByIdAndUpdate(id, updatedBookObj);
};