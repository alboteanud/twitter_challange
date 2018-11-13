const spawn = require('child_process').spawn;
const express = require('express');
const app = express();

const isOnWindows = /^win/.test(process.platform);
const win10_extra = isOnWindows ? '.cmd' : '';
spawn(`twitter-proxy` + win10_extra);
console.log('Request the Twitter API using: http://localhost:7890/1.1/statuses/user_timeline.json\?count\=30\&screen_name\=makeschool');

app.use(express.static(__dirname + '/build'));

const server = app.listen(8081, () => {

  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://localhost:%s', port);

});