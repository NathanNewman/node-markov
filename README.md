This project is a random text generator created in Node JS. It reads existing text from a text file or API and then randomizes it in a Markov chain. It then prints the new text in the terminal. It gets data from the API using Axios.

WSL Commands:

(get from text file)
node make.Text.js file <file name>
Example: node makeText.js file eggs.txt

(get from API)
node make.Text.js url <url>
Example: node makeText.js url http://www.gutenberg.org/files/11/11-0.txt
