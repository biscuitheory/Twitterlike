const connection = require('../config/connectionDb.js')
// const User = require('./User.js')
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

class Tweet {
    constructor(row){
        this.row = row
    }

    // get id () {
    //     return this.row.id
    // }

    // get id_author () {
    //     return this.row.id_author
    // }

    // get text () {
    //     return this.row.text
    // }

    // get creation () {
    //     return this.row.creation
    // }

    static create(id_author, tweet, cb){
        // var sql = `INSERT INTO tweets (id_author, text, creation) VALUES ('${tweet.id_author}', '${tweet.text}', '${tweet.creation}')`
        connection.query('INSERT INTO tweets SET id_author = ?, text = ?, creation = ?', [id_author, tweet, new Date()], (err, result) => {
          if (err) {
            console.log("Il y a une erreur tweet : " + err)
        }
          console.log("Tweet Insert Success!");
          cb(result)
        //   connection.end()
        });
    }

    static all (cb) {
        connection.query('SELECT * FROM tweets LEFT JOIN users ON tweets.id_author = users.id ORDER BY creation DESC LIMIT 10', (err, rows) => {
            if (err) {
                console.log("Il y a une erreur tweet : " + err)
            }
            cb(rows.map((row) => new Tweet(row)))
        })
    }

    static find (id, cb) {
        connection.query('SELECT * FROM tweets LEFT JOIN users ON tweets.id_author = users.id WHERE users.id = ? ORDER BY tweets.creation DESC LIMIT 10', [id], (err, rows) => {
            if (err) throw err;
            cb(rows.map((row) => new Tweet(row)))
            // cb(new Tweet(rows[0]))
        })
    }

//     static find (id, cb) {
//         connection.query('SELECT * FROM tweets WHERE id = ? LIMIT 1', [id], (err, rows) => {
//             if (err) throw err;
//             // cb(rows.map((row) => new Tweet(row)))
//             cb(new Tweet(rows[0]))
//         })
//     }
}

module.exports = Tweet;