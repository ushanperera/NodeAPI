const express = require('express');
const db = require('../db/database');

const User = require('../data_access/user');
const router = express.Router();

router.get("/", (req, res, next) => {
    db.query(User.getAllUsers(), (err, data) => {
        if (!err) {
            res.status(200).json(data);
        }
    });
});

router.post("", (req, res, next) => {
    let user = new User(req.body.firstName, req.body.lastName, req.body.email, req.body.active, req.body.admin);

    db.query(user.addUser(), (err, data) => {
        res.status(200).json({
            message: "User added.",
            userId: data.userId
        });
    });
});

router.delete("/delete/:id", (req, res, next) => {
    var userId = req.body.userId;

    db.query(User.deleteUser(userId), (err, data) => {
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: `User deleted with id = ${userId}.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(200).json({
                    message: "User Not found."
                });
            }
        }
    });
});

router.put("/:id", (req, res) => {
    let userId = req.body.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let active = req.body.active ;
    let admin = req.body.admin ;
    let user = new User( firstName, lastName, email, active, admin);
    db.query(user.updateUser(userId), (err, data) => {
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: "User Updated",
                    affectedRows: data.affectedRows,
                });
            } else {
                res.status(200).json({
                    message: "User Not found.",
                });
            }
        }
    });

});

module.exports = router;
