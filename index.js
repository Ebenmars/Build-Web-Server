const http = require('http'); 
const url = require('url'); 

//creates a server
const server = http.createServer((req,res)=> {

    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
    res.end('This is the overview page');
    }
    else if(pathName === '/product'){
        res.end('This is the product page');
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

