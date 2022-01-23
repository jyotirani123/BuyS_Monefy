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
        
        // this.loginInsertion = loginInsertion;



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


        this.app.get('/api/getItem', (req, res) => {
            let sql = `SELECT * FROM item_details`;
            this.db.query(sql, (err, result) => {
                if(err)
                    console.log(err);
                else
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
        // this.app.get('/api/createAccount', (req, res) => {
        //     let sql = `SELECT * FROM createAccount`;
        //     this.db.query(sql, (err, result) => {
        //         if(err)
        //             console.log(err);
        //         else
        //             console.log("Successfully extracted accounts");
        //         res.send(result);
        //     });
        // });
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
                    if(err) res.status(400);
                    else {
                    console.log('record inserted in login');
                    let sqldata = 'Select userName, type from login where userName = ?';
                    this.db.query(sqldata, [username], (err, data) => {
                        if(err) res.status(400);
                        else{
                            res.send(data);
                            // res.redirect(307,'/login');
                        }
                    });
                }
            })
            // res.send(result);

            // loginInsertion(username, password, userType);
            }
        })
        // .then( () => {
        //     res.redirect('/');
        // })
        }
    });
     //Register bank TABLE...
     this.app.post('/api/registerbank', (req, res) => {
        const bankname = req.body.bankname;
        const bankid = req.body.bankid;
        const ifsc = req.body.ifsc;
        const address = req.body.address;
       const branchcode = req.body.branchcode;
       const interest=req.body.interest;
       const password=req.body.password;
  const userType=req.body.usertype;
     
       
        console.log("ok");
        let sql = `INSERT INTO RegisterBank (bankname,bankid,ifsc,address,branchCode,interest,password) VALUES (?,?,?,?,?,?,?)`;
        
        this.db.query(sql, [bankname, bankid, ifsc, address,branchcode,interest,password], (err, result) => {
            if(err) throw err;
            else {res.send(result);
            console.log('record inserted in registerBank table');
                }
        });

        //insert bank details in login table
        let loginsql = `INSERT INTO login (username,password,type) VALUES (?,?,?)`;
        
        this.db.query(loginsql, [bankname,password,userType], (err, result) => {
            if(err) throw err;
            else {
            console.log('record inserted in registerBank table login');
           
                }
        });
     
    });

    //create account in bank details
    this.app.post('/api/createAccount', (req, res) => {
       
        const customername = req.body.customername;
        const accnum = req.body.accnum;
        const bankname = req.body.bankname;
        const ifsc = req.body.ifsc;
        
        
        console.log("ok");
        let sql = `INSERT INTO createAccount (customername,bankname,accnum,ifsc) VALUES (?,?,?,?)`;
        
        this.db.query(sql, [customername,bankname,accnum,ifsc], (err, result) => {
            if(err) throw err;
            else {res.send(result);
            console.log('record inserted in createAccount table');
                }
        });

     });

    this.app.post('/api/buyer_transaction',(req, res) => {
        const busername = req.body.busername;
        const susername = req.body.susername;
        const item = req.body.item;
        const itemcount = req.body.itemcount;
        const amount = req.body.amount;
        const date = req.body.date;
        console.log("entered in function");
        let sql = `INSERT INTO buyer_transaction (busername,susername,item,itemcount,amount,date) VALUES (?,?,?,?,?,?)`;
        console.log(sql);
        this.db.query(sql,[busername,susername,item,itemcount,amount,date],(err,result)=>{
            if(err) throw err;
            else {
            console.log('record inserted in buyer_transaction');
        }
        })
    });

    this.app.post('/api/loggedUserDetails', (req, res) => {
        const userName = req.body.username;
        let sql = 'SELECT fname, lname, phn, email, userType from signup where username = ?';
        this.db.query(sql, [userName], (err, data) => {
            if(err) res.status(400);
            else{
                res.send(data);
            }
        })
    });

    this.app.post('/api/newItem', (req, res) => {
        const itemName = req.body.itemName;
        let sql =  `SELECT * FROM item_details where itemName = ?`;
        this.db.query(sql, [itemName], (err, data) => {
            if(err) res.status(400);
            else{
                console.log("data length: "+data.length);
                if(data.length == 0){
                    let sql1 = `INSERT INTO item_details(itemName) VALUES (?)`;
                    this.db.query(sql1, [itemName],(err, result) => {
                        if(err) res.status(400);
                        else {
                            console.log('record inserted in item_details');
                            let sql1 = `SELECT * FROM item_details`;
                            this.db.query(sql1, (err, result) => {
                                if(err)
                                    console.log(err);
                                else
                                    res.send(result);
                            });
                        }
                    })
                }
            }
        });
    })

    this.app.post('/api/itemid', (req, res) => {
        const selectedItem = req.body.selectedItem;
        let sql = 'SELECT itemId FROM item_details WHERE itemName = ?';
        this.db.query(sql, [selectedItem], (err, result) => {
            if(err)
                console.log(err);
            else{
                console.log(result);
                res.send(result);
            }
        });
    });

    this.app.post('/api/item', (req, res) => {
        console.log("hi");
        const itemid = req.body.itemid;
        const sname = req.body.sname; 
        const availableItems = req.body.availableItems;
        const itemPrice = req.body.itemPrice;
        const brand = req.body.brand;
        
        let sql = `INSERT INTO supplier_item_transaction VALUES (?, ?, ?, ?, ?)`;
        this.db.query(sql, [itemid, sname, availableItems, itemPrice, brand],(err, result) => {
            if(err) res.status(400);
            else {
                console.log('record inserted in item_details');
                console.log(result);
            }
        })
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
                res.send(result);
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