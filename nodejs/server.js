const http = require('http');
const url = require('url');
const { parse } = require('querystring');
let fruits = ['Яблоко', 'Банан', 'Банан', 'Банан', 'Банан'];
let z = '0';

http.createServer((request, response) => {
  console.log("Server started !")
   

    console.log('server work');
    if (request.method == 'GET') {
        // GET -> получить обработать
        console.log(request.method); // !!!!
        let urlRequest = url.parse(request.url, true);
        // console.log(urlRequest);
        console.log(urlRequest.query.test); // ! GET Params
        if (urlRequest.query.test % 2 == 0) {
            response.end('even');
        }
        console.log(JSON.stringify(fruits))
        response.end(JSON.stringify(fruits));
    }
    else
    if (request.method == 'POST') {

       
        // POST
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        
        request.on('end', () => {
            console.log(body);
            
            for(let i=(Number(z)); i<(Number(z))+1; i++)
            {
              fruits[i] = (body);
              
            }
            if(z!=4)
            {
              z++;
            }
            else
            z=0;

            console.log(fruits);  
            response.write("Ваша запись успешно добавлена");
            response.end();
        });
    }

}).listen(3000);