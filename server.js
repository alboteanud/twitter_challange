var spawn = require('child_process').spawn;

const isWindows = /^win/.test(process.platform); 
const extra = isWindows ? '.cmd' : '';

spawn('twitter-proxy' + extra);
spawn('http-server' + extra);

console.log('Server running on http://localhost:8080');
console.log('Request the Twitter API using: http://localhost:7890/1.1/statuses/user_timeline.json\?count\=30\&screen_name\=makeschool');

