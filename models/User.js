const connection = require('../config/connectionDb.js')
const bcrypt = require("bcrypt");

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
    static create(user, hashedPassword){
        const sql = `INSERT INTO users (lastname, firstname, username, birthdate, gender, tel, city, email, password, avatar) VALUES('${user.lastname}', '${user.firstname}', '${user.username}', '${user.birthdate}', '${user.gender}', '${user.tel}', '${user.city}', '${user.email}', '${hashedPassword}', '${user.avatar}')`
        
        connection.query(sql, function (err, result) {
        if (err) console.log('create user : ' + err)
        console.log("Inscription de l'utilisateur réussie! ✅")
          // connection.end()
        });
    }

    // Méthode hashage du mot de passe
    static async hashPassword(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
    
    // Méthode comparaison des deux mots de passe
    static async validPassword(password, userPassword) {
        return await bcrypt.compare(password, userPassword);
    }

    // Méthode recherche d'un utilisateur par email ou nom utilisateur
    static getUsersByEmailOrUsername(user, cb){
        const sql = `SELECT * FROM users WHERE (email = '${user.email}') OR (username='${user.username || user.email}')`
        connection.query(sql, function (err, result) {
            if (err) console.log('getUsersByEmail : ' + err)
            cb(result)
            console.log("Utilisateur trouvé via le mail ou le username ▶️ : ", result)
        })
    }

    static getIdentifiantParams (identifiant, callback) {
        var sql = `SELECT * FROM users WHERE (email = '${identifiant}') OR (username ='${identifiant}') OR (tel = '${identifiant}')`
        connection.query(sql, function(err, result) {
            if (err) console.log('getIdentifiantParams : ' + err) ;
            const user = result[0];
            console.log("getIdentifiantParams trouvé via le mail : ", user)
            callback(null, user)
        })
    }

    // Méthode recherche d'un utilisateur par id
    static getUserById(id, done) {
        const query = `SELECT * FROM users WHERE id = '${id}';`;

        connection.query(query, (error, data) => {
            if (error) {
            console.error(`Erreur : ${error}`);
            return done(error, null);
            }

            const user = data[0];
            console.log(`Utilisateur : ${user}`);
            return done(null, user);
        });
    }

}

module.exports = User;