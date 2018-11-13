var spawn = require('child_process').spawn;

const isWindows10 = /^win/.test(process.platform); 
const win10_extra = isWindows10 ? '.cmd' : '';

spawn(`twitter-proxy` + win10_extra);
spawn('http-server' + win10_extra);

console.log('Server running on http://localhost:8080');
console.log('Request the Twitter API using: http://localhost:7890/1.1/statuses/user_timeline.json\?count\=30\&screen_name\=makeschool');


