const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, "/files");

async function readFiles() {

    // Errors relating to reading directory folder and reading files are handled in this try catch block.
    try {
        let sum = 0;
        let numbersArray = [];

        let filesArray = await fs.readdir(folderPath);

        for (const file of filesArray) {
            const filePath = path.join(folderPath, file);

           
                const data = await fs.readFile(filePath);
                const lines = data.toString().trim().split("\r\n");

                // Filters values that are not numbers and handles invalid file formats like existance of non numbers
                for (const line of lines) {
                    if (isNaN(Number(line))) {
                        throw new Error(`Invalid data detected in file ${file}: "${line}" is not a number.`);
                    } else {
                        numbersArray.push(Number(line)); // Only add numeric values to numbersArray
                    }
                }
        }

        // Calculates the sum and displays it
        for (const element of numbersArray) {
            sum += element;
        }
        console.log(`The sum is ${sum}`);
    }
    catch (err) {
        if (err.code === "ENOENT") {
            console.error(`File not Found: ${err.message}`);
        }
        else {
            console.error(`Error reading folder. ${err.message}`);
        }
    }
}
readFiles();

//Error Handling for Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err.message);
    process.exit(1); 
});

//Error Handling for Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled promise rejection:', reason);
    process.exit(1); 
});