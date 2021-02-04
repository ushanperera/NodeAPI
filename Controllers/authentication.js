const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const db = require('../helpers/database');
const user = require('../Models/user');

const statusCodes = require('../helpers/httpStatusCodes')
const { validateRegister, validateLogin } = require('../helpers/validation');

const router = express.Router();
let refreshTokens = [] // Store this list in a DB or state server



var getUserByUserName = function (userName, callback) {
    db.query(user.getUserByUserName(userName), (err, result) => {
        if (err) throw err;
        callback(result);
    });
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '55s' }) //eg: "1d", "20h", "60s" 
}



router.post('/login', async (req, res, next) => {
    // try {

    const validatedObj = await validateLogin.validateAsync(req.body)

    getUserByUserName(validatedObj.userName, function (result) {
        if (result && result.length > 0) {
            if (bcrypt.compareSync(validatedObj.password, result[0].password)) {
                // res.status(statusCodes.Accepted).send('Success')
                {
                    const username = validatedObj.userName
                    const user = { name: username }

                    //AccessToken- UserInformation
                    const accessToken = generateAccessToken(user)

                    //serialize the User(from secret key)
                    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                    refreshTokens.push(refreshToken)
                    res.json({ accessToken: accessToken, refreshToken: refreshToken })


                }
            } else {
                res.status(statusCodes.Unauthorized).send('Not Allowed')
            }
        } else {
            return res.status(statusCodes.NotFound).send('Cannot find user')
        }
    });

    // }
    // catch (error) {
    //     if (error.isJoi === true) error.status = statusCodes.UnprocessableEntity
    //     next(error)
    // }
})


//Renew the access token by refresh token
router.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(statusCodes.Unauthorized)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(statusCodes.Forbidden)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(statusCodes.Forbidden)

        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})


router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(statusCodes.NoContent)
})



module.exports = router;
