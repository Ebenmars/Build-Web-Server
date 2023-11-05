const http = require('http'); 
const fs = require('fs'); 
const url = require('url'); 


//only get requested once we start program
const data = fs.readFileSync(`${__dirname}/data.json`,'utf-8');
const dataObj =  JSON.parse(data);



//creates a server
const server = http.createServer((req,res)=> {

    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
    res.end('This is the overview page');
    }
    else if(pathName === '/product'){
        res.end('This is the product page');
    }
    else if(pathName === '/api'){

           res.writeHead(200,{'Content-type': 'application/json'});
           res.end(data);

    }
    else{
        //in case of a page not found
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-header':'Yo!'
    });
        res.end('<h1>Page not found!</h1>');
    }
});



server.listen(8000,'127.0.0.1', ()=>{
    console.log('Listening...')
});

