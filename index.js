const http = require('http'); 
const fs = require('fs'); 
const url = require('url'); 

const replaceTemplate = (temp,product) =>{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
  }
//only get requested once we start program
const overview = fs.readFileSync(`${__dirname}/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template-card.html`,'utf-8');
const product = fs.readFileSync(`${__dirname}/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/data.json`,'utf-8');
const dataObj =  JSON.parse(data);



//creates a server
const server = http.createServer((req,res)=> {

    const pathName = req.url;

    //Overview page
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200,{'Content-type': 'text/html'});

       const cardsLayout = dataObj.map( el => replaceTemplate(tempCard, el));
       console.log(cardsLayout);

    res.end(overview);

    
    }
    //Product page
    else if(pathName === '/product'){
        res.end('This is the product page');
    }

    //API
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

