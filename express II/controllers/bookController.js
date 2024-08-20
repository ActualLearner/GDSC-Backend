const book = require('../models/bookModel.js');

// Id is assigned automatically based on number of documents
const addBook = async (req, res) => {
    const { title, author } = req.body;

    // Validate request body
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }

    try {
        // Get the current count of books and set book Id
        const count = await book.countDocuments({});
        const id = count + 1;

        const newBook = new book({ id, title, author });
        await newBook.save();

        res.status(201).json(newBook);

    } catch (error) {
        res.status(500);
        res.end("Server Error.");
    }
};

const getBook = async (req, res) => {
    const allBooks = await book.find();
    res.status(200).json(allBooks);
}

const deleteBook = async (req, res) => {
    const id = req.params.id;
    const theBook = await book.findOne({ "id": id });
    if (theBook) {
        await book.findOneAndDelete({ "id": id });
        res.status(204);
        res.end("No Content");

    } else {
        res.status(404);
        res.end("Book not found.")
    }
}

const updateBook = async (req, res) => {

    const id = req.params.id;
    const { title, author } = req.body;
    const theBook = await book.findOne({ "id": id });

    try {
        if (theBook) {

            if (title && author) {

                const updatedBook = await book.findOneAndUpdate({ id }, { title, author }, { new: true });
                res.status(200).json(updatedBook);

            } else {

                res.status(400);
                res.end("Title and Author required. ")
            }

        } else {
            res.status(404);
            res.end("Book not found.")
        }
    } catch (err) {
        res.status(500);
        res.end("SErver ERror")
    }
}

module.exports = { addBook, getBook, deleteBook, updateBook };