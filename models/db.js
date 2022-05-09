const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'students'
})

connection.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('work');
    }
})

module.exports = connection