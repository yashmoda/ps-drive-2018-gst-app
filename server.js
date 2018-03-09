'use strict';
const Hapi = require('hapi');
const MySQL = require('mysql');

// Create a server with a host and port
const server = new Hapi.Server({
    host: 'localhost',
    port: 8000
});

const connection = MySQL.createConnection({
     host: 'localhost',
     user: 'psgst',
     password: 'yash1998',
     database: 'psgstinvoicing'
});

connection.connect();

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();

server.route({
    method: 'POST',
    path: '/add_product',
    handler: function(request, reply){
        const product_code = request.payload.product_code;
        const product_name = request.payload.product_name;
        const product_price = request.payload.product_price;
        const product_gst = request.payload.product_gst;
        connection.query('INSERT INTO products (product_code, product_name, product_price, product_gst) VALUES ("' + product_code + '","' + product_name + '","' + product_price + '","'+ product_gst +'")', 
            function (error, results, fields) {
                if (error) throw error;

                console.log("Data Added.");
                return(results);
            });
        return("hello world");
    }
});
