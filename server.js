const http = require('http');
const app = require('./routes');
const dotenv = require('dotenv');

dotenv.config();


//Use system configuration for port or use 6001 by default.
const port = process.env.port || 6001;


//Create server with exported express app
const server = http.createServer(app);
//server.listen(port);
server.listen(port, () => console.log(`Server listning on port ${port}...`));
