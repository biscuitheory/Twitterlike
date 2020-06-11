const connection = require('../config/connectionDb.js')

class User {
    constructor(props){
        this.lastname = props.lastname
        this.firstname = props.firstname
        this.username = props.username
        this.birthdate = props.birthdate
        this.gender = props.gender
        this.tel = props.tel
        this.city = props.city
        this.email = props.email
        this.password = props.password
        this.passwordCheck = props.passwordCheck
        this.results = []
    }
    
    // Création d'un utilisateur
    static create(user){
        const sql = `INSERT INTO users (lastname, firstname, username, birthdate, gender, tel, city, email, password, avatar) VALUES('${user.lastname}', '${user.firstname}', '${user.username}', '${user.birthdate}', '${user.gender}', '${user.tel}', '${user.city}', '${user.email}', '${user.password}', 'Hello')`
        connection.query(sql, function (err, result) {
        if (err) console.log('create user : ' + err)
        console.log("Inscription de l'utilisateur réussie! ✅")
          // connection.end()
        });
    }

}

module.exports = User;