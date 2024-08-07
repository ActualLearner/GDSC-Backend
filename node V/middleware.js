const middlewareStack = [];

function use(middleware) {
    middlewareStack.push(middleware);
}

function executeMiddleware(req, res) {
    let index = 0;

    function next(err) {
        if (err) {
            return errorHandler(err, req, res, next);
        }
        if (index < middlewareStack.length) {
            const middleware = middlewareStack[index];
            index++;
            middleware(req, res, next);
        }
    }

    next();
}

function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

// Route handling middleware
function routeHandler(req, res, next) {
    if (req.url === '/' || req.url === '/home') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("This is my home page");
    } else if (req.url === "/contact") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("This is my contact page");
    } else {
        next(new Error('Page Not Found')); // This will pass error to the next middleware (error handler)
    }
}


function errorHandler(err, req, res, next) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Server Error: ${err.message}`);
}

use(logger);
use(routeHandler);
use(errorHandler);

module.exports = { executeMiddleware };