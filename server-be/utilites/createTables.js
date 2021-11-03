const mysql = require('mysql');
const cred = require('./credentials');

class TABLES {
    
    constructor(){
        
        this.db = mysql.createConnection({
            ...cred,
            database: 'buysmonefy'
        });

        this.sql = {
            login: 'CREATE TABLE IF NOT EXISTS login(userName varchar(100) , password varchar(100) , type int(11) , primary key (userName))'
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