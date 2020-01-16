let errors = require('../utils/errors');

const types = [
    'weather',
    'parking',
    'cocktail',
    'ingredient',
    'pokedex',
    'types'
];

function isValidWidgetType(type) {
    for (let i = 0; i < types.length; ++i)
        if (type == types[i])
            return true;
    return false;
}

function createWidget(req, res) {
    if (!req.body.type || !req.body.config || !req.body.refresh) {
        errors.badRequest(res, 400, "Not enough arguments in request body.");
        return;
    }
    if (!isValidWidgetType(req.body.type)) {
        errors.badRequest(res, 400, "Not valid arguments in request body.");
        return;
    }
    req.conn.query("SELECT id, refresh, type, config, pos FROM widget WHERE user_id = ?", [req.user_id], (err, results) => {
        if (err) throw err;
        req.conn.query("INSERT INTO widget (user_id, refresh, type, config, pos) VALUES (?, ?, ?, ?, ?)", [req.user_id, req.body.refresh, req.body.type, req.body.config, results.length + 1], (err, results) => {
            if (err) throw err;
            res.status(200);
            res.json({
                message: "Widget created.",
                widget_id: results.insertId
            });
        })
    });
}

function updateWidget(req, res) {
    if (!req.body.widget_id, !req.body.config) {
        errors.badRequest(res, 400, "Not enough arguments in request body.");
        return;
    }
    req.conn.query("UPDATE widget SET config = ? WHERE id = ?", [req.body.config, req.body.widget_id], (err, results) => {
        if (err) throw err;
        res.status(200);
        res.json({
            message: "Widget updated."
        });
    })
}

function deleteWidget(req, res) {
    if (!req.body.widget_id) {
        errors.badRequest(res, 400, "Not enough arguments in request body.");
        return;
    }
    req.conn.query("SELECT pos FROM widget WHERE user_id = ?", [req.user_id], (err, results) => {
        if (err) throw err;
        let size = results.length;
        req.conn.query("SELECT pos FROM widget WHERE id = ?", [req.body.widget_id], (err, results) => {
            if (err) throw err;
            let pos = results[0].pos;
            for (let i = 1; i <= size; ++i) {
                req.conn.query("UPDATE widget SET pos = ? WHERE user_id = ? AND pos = ?", [pos + i - 1, req.user_id, pos + i], (err, results) => {
                    if (err) throw err;
                });
            }
            req.conn.query("DELETE FROM widget WHERE id = ?", [req.body.widget_id], (err, results) => {
                if (err) throw err;
                res.status(200);
                res.json({
                    message: "Widget deleted."
                });
            });
        });
    });
}

function moveUpWidget(req, res) {
    if (!req.body.widget_id) {
        errors.badRequest(res, 400, "Not enough arguments in request body.");
        return;
    }
    req.conn.query("SELECT pos FROM widget WHERE id = ?", [req.body.widget_id], (err, results) => {
        if (err) throw err;
        let pos = results[0].pos;
        req.conn.query("UPDATE widget SET pos = ? WHERE user_id = ? AND pos = ?", [pos, req.user_id, pos - 1], (err, results) => {
            if (err) throw err;
            req.conn.query("UPDATE widget SET pos = ? WHERE id = ?", [pos - 1, req.body.widget_id], (err, results) => {
                if (err) throw err;
                res.status(200);
                res.json({
                    message: "Widget moved-up."
                })
            });
        });
    });
}

function moveDownWidget(req, res) {
    if (!req.body.widget_id) {
        errors.badRequest(res, 400, "Not enough arguments in request body.");
        return;
    }
    req.conn.query("SELECT pos FROM widget WHERE id = ?", [req.body.widget_id], (err, results) => {
        if (err) throw err;
        let pos = results[0].pos;
        req.conn.query("UPDATE widget SET pos = ? WHERE user_id = ? AND pos = ?", [pos, req.user_id, pos + 1], (err, results) => {
            if (err) throw err;
            req.conn.query("UPDATE widget SET pos = ? WHERE id = ?", [pos + 1, req.body.widget_id], (err, results) => {
                if (err) throw err;
                res.status(200);
                res.json({
                    message: "Widget moved-down."
                })
            });
        });
    });
}

function compare(a, b) {
    if (a.pos < b.pos)
        return -1;
    if (a.pos > b.pos)
        return 1;
    return 0;
}

function getWidgets(req, res) {
    req.conn.query("SELECT id, refresh, type, config, pos FROM widget WHERE user_id = ?", [req.user_id], (err, results) => {
        if (err) throw err;
        results.sort(compare);
        res.status(200);
        res.json(results);
    });
}

module.exports = {
    createWidget: createWidget,
    updateWidget: updateWidget,
    deleteWidget: deleteWidget,
    getWidgets: getWidgets,
    moveUpWidget: moveUpWidget,
    moveDownWidget: moveDownWidget
};