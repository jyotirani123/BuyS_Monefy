const mysql = require('mysql');
const cred = require('./credentials');

class TABLES {
    
    constructor(){
        
        this.db = mysql.createConnection({
            ...cred,
            database: 'buysmonefy'
        });

        this.sql = {
            login: 'CREATE TABLE IF NOT EXISTS login(userName varchar(100) , password varchar(100) , type int(11) , primary key (userName))',
            signup: 'CREATE TABLE IF NOT EXISTS signup(fname varchar(100), lname varchar(100), phn bigint(20), email varchar(100), username varchar(100), password varchar(100), cpassword varchar(100), userType int, primary key (username))',
            buyerItemPurchase : 'CREATE TABLE IF NOT EXISTS buyer_item_purchase(bname varchar(200), itemId int, sname varchar(200), noOfItems int, totalPrice bigint(20) , modeOfPayment varchar(200) , primary key (bname, itemId, sname))',
            supplierItemTransaction: 'CREATE TABLE IF NOT EXISTS supplier_item_transaction(itemId int , sname varchar(200), availableItems bigint(20), itemPrice bigint(20), brand varchar(100), primary key (itemId,sname))',
            itemDetails : 'CREATE TABLE IF NOT EXISTS item_details(itemId int NOT NULL AUTO_INCREMENT, itemName varchar(100) , primary key (itemId))'

        };
        
    }

    initTable() {
        for(let i in this.sql){
            this.db.query(this.sql[i], (err, result) => {
                if(err)
                    console.log(`Couldn't create table ${i}`);
                else
                    console.log(`Successfully created table ${i}`);
            })
        }
    }
}

module.exports = TABLES;