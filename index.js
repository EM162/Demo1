const express = require('express');
const app = express();
const port = 4200;

app.use(express.json());

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

app.get('/', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }
    const newBook = {
        id: books.length + 1,
        title,
        author,
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter(book => book.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Book API running at http://localhost:${port}`);
});
