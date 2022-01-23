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
            item_details: 'CREATE TABLE IF NOT EXISTS item_details(itemId int AUTO_INCREMENT, itemName varchar(100) , primary key (itemId))',
            supplier_item_transaction: 'CREATE TABLE IF NOT EXISTS supplier_item_transaction(itemId int, sname varchar(200), availabelItems bigInt, itemPrice bigInt, brand varchar(100), primary key (itemId, sname))',
            buyer_transaction : 'CREATE TABLE IF NOT EXISTS buyer_transaction(busername varchar(100), susername varchar(100), item varchar(100), itemcount int(10), amount double, date varchar(20), primary key (busername,susername,item))'
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