const mysql = require('mysql')
require('dotenv').config()

// configuration de la base de données mysql avec dotenv
const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port     : process.env.DEV_DB_PORT || process.env.PORT,
    // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

// connexion à la base de données
connection.connect(function(err) {
    if (err) {
    const sql = "CREATE TABLE IF NOT EXISTS users(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, lastname TEXT, firstname TEXT, birthdate DATE, gender TEXT, city TEXT, email TEXT, password TEXT, username TEXT, tel BIGINT, avatar TEXT)"
    connection.query(sql, function (err, result) {
        if (err) {
            console.log("Table créée ou déjà existante! ✅");
        }
    });
    }
    console.log("Connecté à la database ! ✅");
});

module.exports = connection