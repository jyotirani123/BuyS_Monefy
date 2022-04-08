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
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.json())

        this.temp = 0;

        //Initialize Database
        new DATABASE().initDB();

        //Initialize All The Tables
        new TABLES().initTable();

        this.db = mysql.createConnection({
            ...cred,
            database: 'buys_monefy'
        });

    }

    get() {

        this.app.get('/api/getAllCategories', (req, res) => {
            const sqlSelect = "Select * from item_category_details";
            this.db.query(sqlSelect, (err, result) => {
                for(let i=0; i < result.length ; i++)
                console.log(result[i].categoryId , result[i].categoryName);
                res.send(result);
            })
        })

        this.app.get('/api/getAllTransactions',(req,res) => {
            const paymentSql = "select * from payment_details";
            let map1 = new Map();
            let map2 = new Map();
            let ansMap = new Map();
            let map3 = new Map();
            this.db.query(paymentSql, (err,result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }else{
                    for(let i = 0;i < result.length; i++){
                        let key = result[i].fromUserAccountDetailsId+":"+result[i].toUserAccountDetailsId;
                        let value = result[i].modeOfPayment+"&&"+result[i].timeOfPayment.toLocaleDateString()+"&&"+result[i].paidAmount;
                        console.log(key, " ", value);
                        map1.set(key,value);
                    }
                }
                const userSql = "select userName, userId from user_details where userId in(select userId from user_account_details)";
                this.db.query(userSql,(err,result) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    }else{
                        for(let i=0;i<result.length;i++){
                            map2.set(result[i].userId, result[i].userName);
                        }
                    }
                    const combineUserAccountAndUserId = "select userAccountDetailsId, userId from user_account_details";
                    this.db.query(combineUserAccountAndUserId,(err,result) => {

                        for(let i =0;i<result.length;i++){
                            let key = result[i].userAccountDetailsId;
                            let value = result[i].userId;
                            map3.set(key,value);
                        }

                        for (var entry of map1.entries()) {
                            var key = entry[0];
                            var value = entry[1];
                            const fromId = key.split(":")[0]
                            const toId = key.split(":")[1]
                            const fromName = map2.get(parseInt(map3.get(parseInt(fromId))));
                            const toName = map2.get(parseInt(map3.get(parseInt(toId))));
                            ansMap.set(fromName+":"+toName, map1.get(key));
                        }
                        console.log(ansMap);
                    })
                    
                })
            })
        
        })

        this.app.get('/api/getAllItemForCategoryId', (req, res) => {
            console.log(req);
            const categoryId = req.query.categoryId;

            console.log("categy id : ", categoryId);
            const sqlSelect = "Select distinct(itemId) from item_details where categoryId = ?";
            this.db.query(sqlSelect,[categoryId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }else{
                    let itemList = [];
                    if(result.length == 0){
                        res.sendStatus(500);
                    }else{
                    for(let i=0; i < result.length ; i++){
                            itemList[i] = result[i].itemId;
                    }
                    console.log("result of query is : ", result);
                    console.log("after itemList : ", itemList);
                    const itemSelect = `Select * from item_tbl where itemId in (?)`;
                    this.db.query(itemSelect, [itemList], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        }
                        console.log(result);
                        for(let i=0; i < result.length ; i++)
                        console.log(result[i].itemId , result[i].itemName);
                        res.send(result);
                    })
                }
            }
            })
        })

        this.app.get('/api/getAllItemPurchase',(req,res) => {
            
        })

        this.app.get('/api/getAllBrandListForCategoryItem', (req, res) => {
            const categoryId = req.query.categoryId;
            const itemId = req.query.itemId;
            const sqlSelect = "Select brandName from item_details where categoryId = ? and itemId = ? ";
            this.db.query(sqlSelect, [categoryId,itemId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                for(let i=0; i < result.length ; i++)
                console.log(result[i].brandName);
                res.send(result);
            })
        })

        // get all supplier names and supplier id corresponding to given itemDetailsId
        this.app.get('/api/getAllSuppliers',(req,res) => {
            const categoryId = req.body.categoryId;
            const itemId = req.body.itemId;
            const brandName = req.body.brandName;
            const fetchItemDetailsId = "select itemDetailsId from item_details where categoryId = ? and itemId = ? and brandName = ?";
            this.db.query(fetchItemDetailsId , [categoryId, itemId, brandName] , (err,result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }else{
                    let fetchedItemDetailsId = result[0].itemDetailsId;
                    const fetchSupplierIds = "select userId from supplier_item_details where itemDetailsId = ?";
                    this.db.query(fetchSupplierIds,[fetchedItemDetailsId],(err,result) => {
                        let supplierIdList = [];
                        for(let i=0; i < result.length ; i++){
                            supplierIdList[i] = result[i].userId;
                        }
                        const supplierNameAndIdSql = `select userId, userName from user_details where userId in (?)`;
                        this.db.query(supplierNameAndIdSql,[supplierIdList], (err,result) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                            }else{
                                res.send(result);
                            }
                        })
                    })
                }
            })
        })

        this.app.get('/api/getAllBuyerAndSupplierList', (req, res) => {
            const userType = req.query.userType;
            const sqlSelect = "Select * from user_details where userType = ? ";
            this.db.query(sqlSelect, [userType], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                res.send(result);
            })
        })

        this.app.get('/api/getAllBanks', (req, res) => {
            const bankSelectSql = "Select distinct(bankName) from bank_details";
            this.db.query(bankSelectSql,(err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                res.send(result);
            })
        })

        this.app.get('/api/getAllBranchForBank', (req, res) => {
            const bankName = req.body.bankName;
            // console.log(req);
            const sqlSelect = "select distinct(branchCode) from bank_details where bankName = ?";
            this.db.query(sqlSelect,[bankName],(err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }else
                    res.send(result);
            })
        })

        this.app.get('/api/getUserId',(req,res) => {
            const userName = req.body.userName;
            const userType = req.body.userType;
            let fetchUserIdSql = "select userId from user_details where userName = ? and userType = ?";
            this.db.query(fetchUserIdSql, [userName,userType],(err,result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }else{
                    res.send(result);
                }
            })
        })

    }

    post() {
        this.app.post('/api/signup', (req, res) => {
            const fname = req.body.fname;
            const lname = req.body.lname;
            const phoneNumber = req.body.phoneNumber;
            const emailAddress = req.body.emailAddress;
            const userName = req.body.userName;
            const password = req.body.password;
            const userType = req.body.userType;
            const city = req.body.city;
            const state = req.body.state;
            const address = req.body.address;
            const pinCode = req.body.pinCode;

            console.log("data user_details insertion start!!");
            let sqlAddress = `INSERT INTO address_details (city, state, address, pinCode) VALUES (?,?,?,?)`;

            this.db.query(sqlAddress, [city, state, address, pinCode], (err, result) => {

                if (err) throw err;
                else {
                    console.log('Address record inserted');

                    let addressIdFetchSqlQuery = "SELECT addressId FROM address_details ORDER BY addressId DESC LIMIT 1";
                    let addressId = 0;

                    this.db.query(addressIdFetchSqlQuery, (err, result) => {
                         if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                        else {
                            addressId = result[0].addressId;

                            let signSql = `INSERT INTO user_details (fname, lname, phoneNumber, emailAddress, userName, userType, addressId) VALUES (?,?,?,?,?,?,?)`;

                            this.db.query(signSql, [fname, lname, phoneNumber, emailAddress, userName, userType, addressId], (err, result) => {

                                if (err) throw err;
                                else {

                                    console.log('User Details record inserted');
                                    let userIdFetchSqlQuery = "SELECT userId FROM user_details ORDER BY userId DESC LIMIT 1";
                                    let userId = 0;

                                    this.db.query(userIdFetchSqlQuery, (err, result) => {

                                        if (err) throw err;
                                        else {
                                            userId = result[0].userId;
                                            const lastSignedIn = new Date();
                                            // Make Constants if possible
                                            let sqlLogin = `INSERT INTO login_details (userId,password,lastSignedIn) values 
                                                            (?,aes_encrypt(?,"Buys_Monefy"),?)`;

                                            this.db.query(sqlLogin, [userId, password, lastSignedIn], (err, result) => {
                                                if (err) throw err;

                                                console.log('record inserted in login');
                                                res.sendStatus(200);

                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });

        this.app.post('/api/loginValidate', (req, res) => {
            const userName = req.body.userName;
            const password = req.body.password;
            const userType = req.body.userType;
            let userLoggedIdSql = `SELECT userId from user_details where user_details.userName in (?) and user_details.userType in (?)`;
            this.db.query(userLoggedIdSql, [userName, userType], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                else {
                    console.log('fetched id');
                    console.log(result);
                    const loggedUserId = result[0].userId;
                    console.log(loggedUserId);
                    let loginSql = `SELECT * FROM login_details log where log.userId in (?) and log.password = aes_encrypt(?,"Buys_Monefy")`;

                    this.db.query(loginSql, [loggedUserId, password], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else if(result.length == 0){
                            res.sendStatus
                        }
                        else {
                            console.log(result);
                            res.sendStatus(200);
                        }
                    })

                }
            })
        });

        this.app.post('/api/addCategory', (req, res) => {
            const categoryName = req.body.categoryName;
            let categorySql = `insert into item_category_details (categoryName) values (?)`;
            this.db.query(categorySql, [categoryName], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(200)
                }
            })
        });

        this.app.post('/api/addItem', (req, res) => {
            const itemName = req.body.itemName;
            let categorySql = `insert into item_tbl (itemName) values (?)`;
            this.db.query(categorySql, [itemName], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(200)
                }
            })
        });

        

        this.app.post('/api/addPaymentTransaction', (req, res) => {
            const fromBankName = req.body.fromBankName;
            const fromBranchCode = req.body.fromBranchCode;
            const fromAccountNumber = req.body.fromAccountNumber;
            const amountToBePaid = req.body.amountToBePaid;
            const supplierId = req.body.supplierId;
            const toBankName = req.body.toBankName;
            const toBranchCode = req.body.toBranchCode;
            const toAccountNumber = req.body.toAccountNumber;
            const modeOfPayment = req.body.modeOfPayment;
            const timeOfPayment = new Date();

            let accountNumberList = [fromAccountNumber, toAccountNumber]
            console.log(accountNumberList);
            let fromUserAccountDetailsId;
            let toUserAccountDetailsId;
            const paymentTransactionSql = `select userAccountDetailsId, accountNumber from user_account_details where accountNumber in (?)`;
            this.db.query(paymentTransactionSql, [accountNumberList], (err,result) => {
                    console.log(result);
                    if(result[0].accountNumber === fromAccountNumber){
                        fromUserAccountDetailsId = result[0].userAccountDetailsId;
                        toUserAccountDetailsId = result[1].userAccountDetailsId;
                    }else{
                        fromUserAccountDetailsId = result[1].userAccountDetailsId;
                        toUserAccountDetailsId = result[0].userAccountDetailsId;
                    }

                    const paymentRecordSql = `insert into payment_details(paidAmount, modeOfPayment, timeOfPayment, 
                                                fromUserAccountDetailsId, toUserAccountDetailsId) values(?,?,?,?,?)`;
                    this.db.query(paymentRecordSql, [amountToBePaid, modeOfPayment, timeOfPayment, 
                                    fromUserAccountDetailsId, toUserAccountDetailsId], (err,result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        }else{
                            res.sendStatus(200);
                        }

                    })
            })
        });

        this.app.post('/api/addBrand', (req, res) => {
            const categoryId = req.body.categoryId;
            const itemId = req.body.itemId;
            const brandName = req.body.brandName;
            let categorySql = `insert into item_details (categoryId,itemId, brandName) values (?,?,?)`;
            this.db.query(categorySql, [categoryId, itemId, brandName], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(200)
                }
            })
        });


        this.app.post('/api/addUserAccount', (req, res) => {
            const userId = req.body.userId;
            const bankName = req.body.bankName;
            const branchCode = req.body.branchCode;
            const amount = req.body.amount;
            const accountNumber = req.body.accountNumber;

            let fetchBankIdSql = "select bankId from bank_details where bankName = ? and branchCode = ?";
            this.db.query(fetchBankIdSql, [bankName, branchCode], (err,result) => {
                let fetchBankId = result[0].bankId;
                console.log(fetchBankId);
                let userAccountSql = `insert into user_account_details (userId,bankId, amount, accountNumber) values (?,?,?,?)`;
                this.db.query(userAccountSql, [userId, fetchBankId, amount, accountNumber], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    }
                    else {
                        res.sendStatus(200);
                    }
            })
            })
            
        });

        this.app.post('/api/registerBank', (req, res) => {
            const bankName = req.body.bankName;
            const ifscCode = req.body.ifscCode;
            const city = req.body.city;
            const state = req.body.state;
            const address = req.body.address;
            const pinCode = req.body.pinCode;
            const branchCode = req.body.branchCode;
            const rateOfInterest = req.body.rateOfInterest;
            // let sqlAddress = `INSERT INTO address_details (city, state, address, pinCode) VALUES (?,?,?,?)`;
            let addressSql = `insert into address_details(city,state,address,pinCode) values (?,?,?,?)`;
            this.db.query(addressSql, [city,state,address,pinCode], (err,result) => {
                if(err){
                    console.log(err);
                    res.sendStatus(500);
                }else{
                    console.log("record in address table inserted");
                    let addressIdFetchSqlQuery = "SELECT addressId FROM address_details ORDER BY addressId DESC LIMIT 1";
                    let fetchedAddressId = 0;

                    this.db.query(addressIdFetchSqlQuery, (err, result) => {
                        if (err) throw err;
                        else {
                            fetchedAddressId = result[0].addressId;
                            let bankSql = `insert into bank_details(bankName, ifscCode, addressId, branchCode,rateOfInterest) values(?,?,?,?,?)`
                            this.db.query(bankSql, [bankName, ifscCode, fetchedAddressId, branchCode,rateOfInterest], (err, result) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                }
                                else {
                                    console.log("bank details inserted");
                                    res.sendStatus(200);
                                }
                            })
                        }
                    })
                }
            });
        });

        this.app.post('/api/addSupplierItem', (req, res) => {
            const categoryId = req.body.categoryId;
            const itemId = req.body.itemId;
            const brandName = req.body.brandName;
            const userId = req.body.userId;
            const pricePerItem = req.body.pricePerItem;
            const availableItems = req.body.availableItems;
            let categorySql = `select itemDetailsId from item_details where categoryId = ? and itemId = ? and brandName = ?`;
            this.db.query(categorySql, [categoryId, itemId, brandName], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                else {
                    const itemDetailsId = result[0].itemDetailsId;
                    let supplierSql = `insert into supplier_item_details(itemDetailsId, userId, pricePerItem, availableItems) values(?,?,?,?)`
                    this.db.query(supplierSql, [itemDetailsId, userId, pricePerItem, availableItems], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        }
                        else {
                            console.log("Supplier item details inserted");
                            res.sendStatus(200);
                        }
                    })
                }
            })
        });

        this.app.post('/api/addBuyerItemPurchase', (req, res) => {
            const categoryId = req.body.categoryId;
            const itemId = req.body.itemId;
            const brandName = req.body.brandName;
            const supplierId = req.body.supplierId;
            const buyerId = req.body.buyerId;
            const noOfItems = req.body.noOfItems;
            const totalPrice = req.body.totalPrice;
            const modeOfPayment = req.body.modeOfPayment;
            let categorySql = `select itemDetailsId from item_details where categoryId = ? and itemId = ? and brandName = ?`;
            this.db.query(categorySql, [categoryId, itemId, brandName], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                else {
                    const itemDetailsId = result[0].itemDetailsId;
                    let supplierSql = `select supplierItemDetailsId, availableItems from supplier_item_details where itemDetailsId = ? and userId = ? `;
                    this.db.query(supplierSql, [itemDetailsId, supplierId], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        }
                        else {
                            const supplierItemDetailsId = result[0].supplierItemDetailsId;
                            const availableItems = result[0].availableItems;
                            if(noOfItems > availableItems){
                                console.log("User request more than items available");
                                res.send(400);
                            }
                            const paymentDateTime = new Date();
                            let buyerSql = `insert into buyer_item_purchase(supplierItemDetailsId, userId, noOfItems, modeOfPayment,purchaseDateTime,totalPrice) values(?,?,?,?,?,?)`
                            this.db.query(buyerSql, [supplierItemDetailsId, buyerId, noOfItems, modeOfPayment, paymentDateTime,totalPrice], (err, result) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                }
                                else {
                                    console.log("Buyer item Purchase details inserted");
                                    res.sendStatus(200);
                                }
                            })     
                        }
                    })
                }
            })
        });
    }
    listen() {
        this.app.listen(this.port, (err) => {
            if (err)
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