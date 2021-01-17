const express = require('express');
const bcrypt = require('bcrypt')

const db = require('../helpers/database');
const user = require('../Models/user');

const statusCodes = require('../helpers/httpStatusCodes')
const { validateRegister, validateLogin } = require('../helpers/validation');

const router = express.Router();



// router.get("/test", (req, res, next) => {
//     res.send('Hello!');
// });

router.get("/:userName", (req, res, next) => {
    const userName = req.params.userName;

    getUserByUserName(userName, function (result) {
        if (result && result.length > 0)
            res.send(JSON.stringify(result));
        else
            res.status(statusCodes.NotFound).json(`User Not Found`);
    });
});


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



router.post('/login', async (req, res, next) => {
    try {

        const validatedObj = await validateLogin.validateAsync(req.body)

        getUserByUserName(validatedObj.userName, function (result) {
            if (result && result.length > 0) {
                if (bcrypt.compareSync(validatedObj.password, result[0].password)) {
                    res.status(statusCodes.Accepted).send('Success')
                } else {
                    res.status(statusCodes.Unauthorized).send('Not Allowed')
                }
            } else {
                return res.status(statusCodes.NotFound).send('Cannot find user')
            }
        });


    }
    catch (error) {
        if (error.isJoi === true) error.status = statusCodes.UnprocessableEntity
        next(error)
    }
})



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
