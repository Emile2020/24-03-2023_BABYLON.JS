const express = require('express');
const app = express();
const fs = require('fs');
var restart = new Date()
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});
app.get('/lastrestart', (req, res) => {
    res.send(restart.toLocaleString());
});

const server = app.listen(3000)
//when a file is updated, the server will restart
fs.watchFile(__dirname + '/src/index.html', () => {
    //Check if there are no syntax errors in the file
    try {
        require.resolve(__dirname + '/src/index.html');
    } catch (e) {
        console.log('There are syntax errors in the file');
        return;
    }
    //Set the date of the restart + 500ms
    restart = new Date();
    server.close();
    server.listen(3000);
    console.log('Server is running again on port 3000');
});