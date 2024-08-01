const fs = require('fs');

fs.watch("command.txt", (eventType, fileName) => {
    if (eventType === "change") {

        let data = fs.readFileSync("command.txt", "utf8");

        data = data.toString().trim();
        console.log(data);

        const commandArray = data.split(" ");
        const command = commandArray[0].toLowerCase();
        const file = commandArray[3];

        if (command === "create") {
            fs.writeFile(file, " ", "utf8", (err) => {
                if (err) throw (err);
                console.log(`${file} created successfully. `);
            });
        }
        else if (command === "delete") {
            fs.unlink(file, (err) => {
                if (err) throw (err);
                console.log(`${file} deleted successfully. `);
            })
        }
        else if (command === "rename") {
            let newFileName = commandArray[5];
            fs.rename(file, newFileName, (err) => {
                if (err) throw (err);
                console.log(`${file} has been renamed to ${newFileName}`);
            });
        }
        else if (command === "add") {
            let addFileName = commandArray[4];
            let textContents = commandArray.slice(5).join(" ");

            fs.appendFile(addFileName, textContents, "utf8", (err) => {
                if (err) throw (err);
                console.log(`Content added to ${addFileName}`);
            });
        }
        else { return null; }

    }
});