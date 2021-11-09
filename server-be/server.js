const express = require('express');
const mysql = require('mysql');
const DATABASE = require('./utilities/createDB');
const TABLES = require('./utilities/createTables');
const cred = require('./utilities/credentials');
const bodyParser = require('body-parser');
const cors = require('cors');
class BUYSMONEFY {

    constructor(port, app) {

        this.port = port;
        this.app = app;
        this.app.use(cors())
// used to grab frontend infor to backend
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(express.json())

        this.temp = 0;

        //Initialize Database
        new DATABASE().initDB();

        //Initialize All The Tables
        new TABLES().initTable();
        
        this.db = mysql.createConnection({
            ...cred,
            database: 'buysmonefy'
        });

    }

    get() {
        this.app.get('./loginValidate', (req, res) => {
            const userName = req.body.userName;
            const password = req.body.password;
            const userType  = req.body.userType;
            let sql = `SELECT * FROM login where userName = '${userName}' and password = '${password}' and type = '${userType}'`;
            this.db.query(sql, (err, result) => {
                if(err)
                    console.log(err);
                else
                    console.log("Successfully login");
                res.send(result);
            });
        });

// Will change all the query later after verification - written just for example
        //GET LIST OF ALL BUYERS
        this.app.get('/api/getBuyers', (req, res) => {
            let sql = `SELECT * FROM buyerDetails`;
            this.db.query(sql, (err, result) => {
                if(err)
                    console.log(err);
                else
                    console.log("Successfully extracted buyers");
                res.send(result);
            });
        });

        //GET LIST OF ALL BUYER FOR SUPPLIER
        this.app.get('/api/getBuyers/:id', (req, res) => {
            let sql = `SELECT * FROM buyerSupplierTrns where supplierId = '${req.params.id}'`;
            this.db.query(sql, (err, result) => {
                if(err)
                    console.log(err);
                else
                    console.log("Successfully extracted buyers");
                res.send(result);
            });
        });

        //ADD BUYER SUPPLER TRANSACTION
        this.app.post('/api/addBuyerSupplierTrns', (req, res) => {
            let sql = `INSERT INTO buyerSupplierTrns(buyerId, supplierId, invoiceId) VALUES (${req.body.bid}, ${req.body.sid}, ${req.body.invId});`;

                for(let i = 0; i < sql.length; i++){
                    this.db.query(sql[i], (err, result) => {
                        if(err){
                            console.log("Couldn't add");
                            this.temp = 1;
                        }
                        else
                            console.log("Successfully inserted");
                    });
                    if(this.temp)
                        break;
                }
        });
    }

    listen() {
        this.app.listen(this.port, (err) => {
            if(err)
                console.log(err);
            else
                console.log(`Server Started On ${this.port}`);
        })
    }
    
}

let buysmonefy = new BUYSMONEFY(3001, express());
buysmonefy.get();
buysmonefy.listen();