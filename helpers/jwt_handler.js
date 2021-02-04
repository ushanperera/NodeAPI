// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1] // to split 'Bearer XXXX' and take the token
//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         //console.log(err)
//         if (err) return res.status(statusCodes.Forbidden).send(err.message)
//         req.user = user
//         next() // Move on from middleware
//     })
// }