var spawn = require('child_process').spawn;

const isWindows = /^win/.test(process.platform); 
spawn(isWindows ? 'twitter-proxy.cmd' : 'twitter-proxy');
spawn(isWindows ? 'http-server.cmd' : 'http-server');

console.log('Server running on http://localhost:8080');
console.log('Request the Twitter API using: http://localhost:7890/1.1/statuses/user_timeline.json\?count\=30\&screen_name\=makeschool');

