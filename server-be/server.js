const express = require('express');
const mysql = require('mysql');
const DATABASE = require('./utilities/createDB');
const TABLES = require('./utilities/createTables');
const cred = require('./utilities/credentials');
const bodyParser = require('body-parser');
const cors = require('cors');
const { password } = require('./utilities/credentials');
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

        this.app.get('/api/getItems', (req,res) => {
            const sqlSelect = "Select itemId,itemName from item_details";
            this.db.query(sqlSelect,(err,result) => {
                // console.log(result);
                res.send(result);
            })
        })

        this.app.get('/api/getBuyerPurchaseData', (req,res) => {
            const sqlSelect = "Select bname,sname,itemName,noOfItems,totalPrice,modeOfPayment from buyer_item_purchase natural join item_details";
            this.db.query(sqlSelect,(err,result) => {
                console.log(result);
                res.send(result);
            })
        })

        this.app.get('/api/getSupplierItems', (req,res) => {
            const sqlSelect = "Select itemId,sname,itemPrice,availableItems from supplier_item_transaction";
            this.db.query(sqlSelect,(err,result) => {
                // console.log(result);
                res.send(result);
            })
        })

        this.app.get('/api/loginValidate', (req, res) => {
            
          
            const userName = req.query.userName;
            const password = req.query.password;
            const userType  = req.query.userType;
            
            let sqlSelect = `SELECT * FROM login where userName = '${userName}' and password = '${password}' and type = ${userType}`;
            this.db.query(sqlSelect, (err, result) => {

                if(err){
                    console.log(err);
                    console.log("login validate backend");
                }
                else
                    console.log(result);
                res.send(result);
            });
        });

// Will change all the query later after verification - written just for example
        //GET LIST OF ALL BUYERS
        this.app.get('/api/getBuyers', (req, res) => {
            let sql = `SELECT * FROM login`;
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

    
    post(){
    
    this.app.post('/api/submitBuyerPurchase' , (req,res) => {
        const bname = req.body.bname;
        const itemId = req.body.itemId;
        const sname = req.body.sname;
        const noOfItems = req.body.noOfItems;
        const totalPrice = req.body.totalPrice;
        const modeOfPayment = req.body.modeOfPayment;
        let sql = `Insert into buyer_item_purchase (bname,itemId,sname,noOfItems,totalPrice,modeOfPayment) values (?,?,?,?,?,?)`;
        this.db.query(sql,[bname,itemId,sname,noOfItems,totalPrice,modeOfPayment],(err,result) => {
            if(err) throw err;
            else
                console.log("record inserted in buyer_item_purchase");
        })
    })
    
    this.app.post('/api/signup', (req, res) => {
        const fname = req.body.fname;
        const lname = req.body.lname;
        const phn = req.body.phn;
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        const userType = req.body.userType;
        if(password !== cpassword){
            console.log("password not matched!!");
        }
        else{
        console.log("data signup inserted!!");
        let sql = `INSERT INTO signup (fname, lname, phn, email, username, password, cpassword, userType) VALUES (?,?,?,?,?,?,?,?)`;
        
        this.db.query(sql, [fname, lname, phn, email, username, password, cpassword, userType], (err, result) => {
            if(err) throw err;
            else {
            console.log('record inserted');

            let sqlLogin = `INSERT INTO LOGIN (userName,password,type) values (?,?,?)`;
            this.db.query(sqlLogin, [username,password,userType],(err, result) => {
                    if(err) throw err;
                    else {
                    console.log('record inserted in login');}
            });

            // loginInsertion(username, password, userType);
            }
        });
        }
    });

    this.app.post('/api/loginValidate', (req, res) => {
        const username = req.body.userName;
        const password = req.body.password;
        const userType = req.body.userType;
        let sql = `SELECT * FROM login log where log.userName in (?) and log.password in (?) and log.type in (?)`;
        this.db.query(sql, [username, password, userType], (err, result) => {
            // if(err) throw err;
            // also use boolean operator (!!)
            if(result.length>0) {
                console.log(result);
                res.send({msg:true});
                //res.redirect("https://www.google.com/");
            }
            else{
                res.send({ message : 'Wrong username/ password combination'});
                console.log({ message : 'Wrong username/ password combination'});
            }
        });
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
buysmonefy.post();
buysmonefy.get();