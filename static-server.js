
const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get(['/', 'index.html'], (req, res) => {
    res.sendFile('index.html');
});

const server = app.listen(8001, () => {
    const host = server.address().address;
    const port = server.address().port;
    
    // console.log('App listening at http://localhost:%s', port);
});