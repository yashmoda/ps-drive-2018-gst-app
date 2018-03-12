'use strict';
const Hapi = require('hapi');
const MySQL = require('mysql');
const request = require('request');

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

    try 
    {
        await server.start();
    }
    catch (err) 
    {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();

// add a product
server.route({
    method: 'POST',
    path: '/add_product',
    handler: function(request, reply){
        const product_code = request.payload.product_code;
        const product_name = request.payload.product_name;
        const product_price = request.payload.product_price;
        const product_gst = request.payload.product_gst;
        var mysql = 'INSERT INTO products (product_code, product_name, product_price, product_gst) VALUES ("' + product_code + '","' + product_name + '","' + product_price + '","'+ product_gst +'")';
        connection.query(mysql,
            function (error, results, fields) {
                if (error) throw error;
                console.log("Data Added.");
            });
        return("Product added successfully");
    }
});

//get a product.
server.route({
    method: 'GET',
    path: '/show_product/{product_code}',
    handler: function(request, reply){
        const product_code = request.params.product_code;
        connection.query('SELECT * FROM products WHERE product_code = "' + product_code + '"',
            function(error, results, fields)
            {
                if(error)
                {
                    throw error;
                }
            
                console.log(results);
                return(results);
            });
        console.log("Product data shown.");
        return("Product data shown.");
    }
});

//edit a product.
server.route({
    method: 'POST',
    path: '/edit_product',
    handler: function(request, reply)
    {
        const product_code = request.payload.product_code;
        const product_name = request.payload.product_name;
        const product_price = request.payload.product_price;
        const product_gst = request.payload.product_gst;
        var mysql = "UPDATE products SET product_name = ?, product_price = ?, product_gst = ? WHERE product_code = ?";
        connection.query(mysql, [product_name, product_price, product_gst, product_code], 
            function(error, results, fields)
            {
                if (error)
                {
                    throw error;
                }
                console.log(results);
                return(results);
            });
        console.log("Product edited successfully.");
        return("Product edited successfully");
    }
});

//Delete a product.
server.route({
    method: 'GET',
    path: '/delete_product/{product_code}',
    handler: function(request, reply)
    {
        const product_code = request.params.product_code;
        var query = 'delete from products where product_code ="'+ product_code + '"';
        connection.query(query, function(error, results, fields)
        {
            if(error)
            {
                throw error;
            }
            console.log(results);
            return(results);
        });
        console.log("Product deleted.");
        return("Product deleted.")
    }
});

//show all products
server.route({
    method: 'GET',
    path: '/show_all_products/',
    handler: function(request, reply)
    {
        var query = 'select * from products';
        connection.query(query, function(error, results, fields)
        {
            if(error)
            {
                throw error;
            }
            console.log(results);
            return(results);
        });
        console.log("Showed all products.");
        return("Showed all products.")
    }
});

