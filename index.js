const http = require('http'); 

//creates a server
const server = http.createServer((req,res)=> {
    res.end('Hello from the server');
});

server.listen(8000,'127.0.0.1', ()=>{
    console.log('Listening...')
});

