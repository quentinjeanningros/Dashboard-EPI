function badRequest(res, code, msg) {
    res.status(code);
    res.json({
        message: msg
    });
}

module.exports = {
    badRequest: badRequest
}