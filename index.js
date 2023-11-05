
const http = require('http'); 
const fs = require('fs'); 
const url = require('url'); 
const replaceTemplate = require('./modules/replaceTemplate');

//only get requested once we start program
const overview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/data.json`,'utf-8');
const dataObj =  JSON.parse(data);



//creates a server
const server = http.createServer((req,res)=> {

    const { query, pathname } = url.parse(req.url,true);

    //Overview page
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200,{'Content-type': 'text/html'});

       const cardsLayout = dataObj.map( el => replaceTemplate(tempCard, el)).join('');
       const output = overview.replace('{%PRODUCT_CARDS%}',cardsLayout);

    res.end(output);

    
    }
    //Product page
    else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
      }

    //API
    else if(pathname === '/api'){

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

