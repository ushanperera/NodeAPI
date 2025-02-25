const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const db = require('../helpers/database');
const user = require('../Models/user');
const JWTh = require('../helpers/jwt_handler');

const statusCodes = require('../helpers/httpStatusCodes')
const { validateRegister, validateLogin } = require('../helpers/validation');

const router = express.Router();
// let refreshTokens = [] // Store this list in a DB or state server


// router.get("/test", (req, res, next) => {
//     res.send('Hello!');
// });

// router.get("/:userName", (req, res, next) => {
//     const userName = req.params.userName;

//     getUserByUserName(userName, function (result) {
//         if (result && result.length > 0)
//             res.send(JSON.stringify(result));
//         else
//             res.status(statusCodes.NotFound).json(`User Not Found`);
//     });
// });


var getUserByUserName = function (userName, callback) {
    db.query(user.getUserByUserName(userName), (err, result) => {
        if (err) throw err;
        callback(result);
    });
}





router.post("/register", async (req, res, next) => {
    try {
        const validatedObj = await validateRegister.validateAsync(req.body)
        const hashedPassword = await bcrypt.hash(validatedObj.password, 10);

        getUserByUserName(validatedObj.userName, function (result) {
            if (result && result.length > 0)
                res.status(statusCodes.Conflict).json(`User already exist`);
            else {
                db.query(user.registerUser(validatedObj.userName, hashedPassword), (err, data) => {
                    res.status(statusCodes.Created).json({
                        message: "User added.",
                        userName: data.userName
                    });
                });
            }
        });
    }
    catch (error) {
        if (error.isJoi === true) error.status = statusCodes.UnprocessableEntity
        next(error)
    }
})



router.get('/posts', authenticateToken, (req, res) => {
    // res.json(posts.filter(post => post.username === req.user.name))
    res.status(statusCodes.OK).send('content is here')
})



// This function needs to move to jwt_handler.js
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // to split 'Bearer XXXX' and take the token
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        //console.log(err)
        if (err) return res.status(statusCodes.Forbidden).send(err.message)
        req.user = user
        next() // Move on from middleware
    })
}


router.get("/", (req, res, next) => {
    db.query(User.getAllUsers(), (err, data) => {
        if (!err) {
            res.status(statusCodes.OK).json(data);
        }
    });
});


router.post("", (req, res, next) => {
    let user = new User(req.body.firstName, req.body.lastName, req.body.email, req.body.active, req.body.admin);

    db.query(user.addUser(), (err, data) => {
        res.status(statusCodes.Created).json({
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
                res.status(statusCodes.NoContent).json({
                    message: `User deleted with id = ${userId}.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(statusCodes.NotFound).json({
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
    let active = req.body.active;
    let admin = req.body.admin;
    let user = new User(firstName, lastName, email, active, admin);
    db.query(user.updateUser(userId), (err, data) => {
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(statusCodes.Accepted).json({
                    message: "User Updated",
                    affectedRows: data.affectedRows,
                });
            } else {
                res.status(statusCodes.NotFound).json({
                    message: "User Not found.",
                });
            }
        }
    });

});


module.exports = router;
