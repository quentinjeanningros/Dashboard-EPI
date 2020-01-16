let mysql = require('mysql');
let errors = require('../utils/errors');
let jwt = require('jsonwebtoken');

const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const database = process.env.MYSQL_DATABASE;
const privateKey = process.env.MY_PRIVATE_KEY || "dashboardprivatekey";
const config = {
    host,
    user,
    password,
    database
};
var conn = null;

function codeJWToken(id) {
    return jwt.sign({
        id
    }, privateKey, { expiresIn: '5h' });
}

function decodeJWToken(req, res, next) {
    if (req.header('Authorization') == null)
        errors.badRequest(res, 400, "No such token in request.");
    else {
        jwt.verify(req.header('Authorization'), privateKey, function(err, decoded) {
            if (err)
                errors.badRequest(res, 400, "Token is invalid");
            else {
                req.user_id = decoded.id;
                next();
            }
        });
    }
}

function connDataB(req, res, next) {
    if (conn == null) {
        conn = mysql.createConnection(config);
        conn.connect(function(err) {
            if (err) {
                console.log(err);
                errors.badRequest(res, 400, "Error in database connection.");
            } else {
                req.conn = conn;
                next();
            }
        });
    } else {
        req.conn = conn;
        next();
    }
}

function createUser(username, password) {
    let sql = "INSERT INTO users (username, password) VALUES ('" + username + "', '" + password + "')";
    conn.query(sql, function(err, result) {
        if (err) throw err;
    });
}

function isUnusedUsername(req, res) {
    conn.query("SELECT username FROM users", function(err, result, fields) {
        if (err) throw err;
        for (let i = 0; i < result.length; ++i)
            if (result[i].username == req.body.username) {
                errors.badRequest(res, 400, "User '" + req.body.username + "' already exist");
                return;
            }
        createUser(req.body.username, req.body.password);
        res.status(200);
        res.json({ message: req.body.username + " added." });
    });
}

function isValidUsername(req, res) {
    conn.query("SELECT id FROM users WHERE username = ? AND password = ?", [req.body.username, req.body.password], (err, results) => {
        if (err) throw err;
        if (results == null) {
            errors.badRequest(res, 400, "Username and password doesn't match.");
        } else {
            res.status(200);
            res.json({
                message: req.body.username + " connected.",
                token: codeJWToken(results[0].id)
            })
        }
    })
}

function getUsers() {
    conn.query("SELECT username, password FROM users", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        return true;
    });
}

module.exports = {
    conn: conn,
    connDataB: connDataB,
    isUnusedUsername: isUnusedUsername,
    isValidUsername: isValidUsername,
    getUsers: getUsers,
    codeJWToken: codeJWToken,
    decodeJWToken: decodeJWToken
};