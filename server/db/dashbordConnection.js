var auth = require('./databaseConnection');
var errors = require('../utils/errors');

function connectUser(req, res) {
    if (!req.body.username || !req.body.password) {
        errors.badRequest(res, 400, "Not enough arguments in request body.");
        return;
    }
    auth.isValidUsername(req, res);
}

function createUser(req, res) {
    if (!req.body.username || !req.body.password) {
        errors.badRequest(res, 400, "Not enough arguments in request body.");
        return;
    }
    auth.isUnusedUsername(req, res);
}

function getUsers(req, res) {
    auth.getUsers();
    res.status(200);
    res.json({ message: "Success" });
}

module.exports = {
    connectUser: connectUser,
    createUser: createUser,
    getUsers: getUsers
}