// const mysql = require('mysql')

// const db = mysql.createConnection({
//     host: "localhost" , 
//     user: "root" , 
//     password: " " , 
//     database : "coba"
// })

// module.exports = db

const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost" ,
    user : "root" ,
    password : "" ,
    database : "coba"
})

module.exports = db

