const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')
// const Joi = require('@hapi/joi')

const items = require('./Controllers/items')
const groups = require('./Controllers/groups')
const users = require('./Controllers/users')
const jwt_handler = require('./Controllers/authentication')

// const mqttHandler = require('./mqtt/mqtt_handler');


const app = express();

app.use(cors());
// app.use(express.json())

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/items", items);
app.use("/groups", groups);
app.use("/users", users);
app.use("/", jwt_handler);



//MQTT------------------------------------------------------------------
// var mqttClient = new mqttHandler();
// mqttClient.connect();

// app.post("/send-mqtt", function(req, res) {
//     mqttClient.sendMessage("Subject001", req.body.message);
//     mqttClient.subscribe("Subject001");
//     res.status(200).send("Message sent to mqtt" + req.body.message);});
//-----------------------------------------------------------------------------


//if we are here then the specified request is not found
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//all other requests are not implemented.
app.use((err, req, res, next) => {
    res.status(err.status || 501);
    res.json({
        error: {
            code: err.status || 501,
            message: err.message
        }
    });
});

module.exports = app;
