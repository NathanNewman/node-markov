/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

// Function to create the text and print in the terminal.
function createText(data){
    let mm = new markov.MarkovMachine(data);
    console.log(mm.makeText());
}

// Function to get Text from a text file and send it to the createText function.
function getText(path){
    fs.readFile(path, 'utf8', (error, data) => {
        if (error){
            console.log(`Error reading ${path}:`, error);
            process.kill(1);
        }
        createText(data);
    });
}

// Function to get text from an API. Works with http://www.gutenberg.org/files/11/11-0.txt
async function createURLText(url) {
    let response;
  
    try {
      response = await axios.get(url);
    } catch (error) {
      console.error(`Invalid URL: ${url}: ${error}`);
      process.exit(1);
    }
    createText(response.data)
  }

// Statement to notify user when using an improper amount of arguments.
if (process.argv.length != 4) {
    console.error("Expected two arguments!");
    process.exit(1);
}

// Variables for the two arguments.
const type = process.argv[2];
const path = process.argv[3];

// Statement to determine the proper function to start.
if (type === "file") { 
    getText(path);
} else if (type === "url") {
    createURLText(path);
} else {
        console.error(`Error, invalid argument: ${type}`);
        process.exit(1);
}