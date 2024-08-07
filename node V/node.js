const http = require('http');
const { executeMiddleware } = require('./middleware.js')

const port = 3000;

const myServer = http.createServer((req, res) => {
    executeMiddleware(req, res);
});

myServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})