const mongoose = require('mongoose');
const User = require('./user.js')

mongoose.connect('mongodb://localhost:27017/libraryDB');

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});
mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected');
});


const bookData = [
    {
        title: "The Lord of the Rings",
        author: "Tolken",
        yearPublished: 1954,
        genre: ["Fantasy", "Adventure"],
        availableCopies: 10,
    },
    {
        title: "Pride and Prejudice",
        author: "Jane",
        yearPublished: 1813,
        genre: ["Romance", "Classic"],
        availableCopies: 3,
    },
    {
        title: "The Hitchhiker's Guide",
        author: "Tolken",
        yearPublished: 1979,
        genre: ["Science Fiction", "Comedy"],
        availableCopies: 8,
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper",
        yearPublished: 1960,
        genre: ["Historical Fiction", "Classic"],
        availableCopies: 5,
    },
    {
        title: "The Hunger Games",
        author: "Collins",
        yearPublished: 2008,
        genre: ["Dystopian", "Science Fiction"],
        availableCopies: 6,
    },
    {
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        yearPublished: 1988,
        genre: ["Science", "Physics"],
        availableCopies: 3,
    },
    {
        title: "The Da Vinci Code",
        author: "Brown",
        yearPublished: 2003,
        genre: ["Mystery", "Thriller"],
        availableCopies: 5,
    },
    {
        title: "Angels & Demons",
        author: "Brown",
        yearPublished: 2000,
        genre: ["Mystery", "Thriller"],
        availableCopies: 2,
    },
]


async function addBook(title, author, year, genre, copies) {

    const newBook = new User({
        title: title,
        author: author,
        yearPublished: year,
        genre: genre,
        availableCopies: copies,
    });
    await newBook.save();
    console.log("Book successfully added. ");
}

// For adding more than one book or an array of books

async function addManyBooks(books) {
    const results = await User.insertMany(books);
}

async function updateCopies(title, copies) {
    await User.updateOne({ title: title }, { availableCopies: copies });
    console.log(`${title} Copies updated to ${copies}`);

}

async function findByAuthor(author) {

    const books = await User.find({ author: author });

    if (books.length < 1) {
        console.log(`No books by ${author} available. `)
    } else {
        console.log(books, `are all the books by ${author}`);
    }

}

async function list() {
    const books = await User.find();
    console.log(books, "\nListed all books successfully. ");
}

async function deleteByTitle(title) {
    const deleteBook = await User.findOne({ title: title });
    await User.deleteOne({ title: title });
    console.log(` "${deleteBook.title}" was deleted. `);
}

// Items will be duplicated if you run addBooks/addManyBooks twice

// Function to run the code in order, Make sure to call the functions only inside it.
async function run() {
    try {
        await addManyBooks(bookData);
        await addBook("MyNewBook", "Me", 2024, ["Mystery", "Action"], 3)
        await updateCopies("MyNewBook", 99);
        await findByAuthor("Me");
        // await deleteByTitle("MyNewBook");
        // await list();

    } catch (err) {
        console.log(err.message);
    }
}

run();