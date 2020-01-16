let errors = require('../utils/errors');

function oauthReturn(req, res) {
    if (!req.body.oauth_token, !req.body.oauth_verifier) {
        errors.badRequest(res, 400, "Not enough arguments in request body.");
        return;
    }
    res.status(200);
    res.json({ message: "ok" });
}

module.exports = {
    oauthReturn: oauthReturn
}