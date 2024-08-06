const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');
const { getMovies } = require('./movies.js');

const port = 3000;
const server = http.createServer((req, res) => {


    if (req.url === '/') {

        const filePath = path.join(__dirname, '../', './index.html');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading index.html:', err);
                res.statusCode = 500;
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });

    } else if (req.url === '/style.css') {

        const filePath = path.join(__dirname, '../', 'style.css');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading style.css:', err);
                res.statusCode = 500;
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });

    } else if (req.url === '/index.js') {

        const filePath = path.join(__dirname, '../', 'index.js');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading index.js:', err);
                res.statusCode = 500;
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });

    } else if (req.url.startsWith('/search') && req.method === "GET") {

        const parsedUrl = url.parse(req.url);
        const queryParams = querystring.parse(parsedUrl.query);
        const query = queryParams.query;
        const page = queryParams.page || 1;


        getMovies(query, page)
            .then(movies => {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(movies));

            })

            .catch(err => {
                console.error('Error handling GET request:', err);
                res.statusCode = 500;
                res.end('Internal Server Error');
            });

    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});