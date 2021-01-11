const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')
const Joi = require('joi') // validation(isValid)

const items = require('./api/items')
const groups = require('./api/groups')
const users = require('./api/users')

// const mqttHandler = require('./mqtt/mqtt_handler');


const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// app.use("/products", products);
// app.use("/orders", orders);
app.use("/items", items);
app.use("/groups", groups);
app.use("/users", users);

//MQTT------------------------------------------------------------------
// var mqttClient = new mqttHandler();
// mqttClient.connect();

// app.post("/send-mqtt", function(req, res) {
//     mqttClient.sendMessage("Subject001", req.body.message);
//     mqttClient.subscribe("Subject001");
//     res.status(200).send("Message sent to mqtt" + req.body.message);});




//---------------------Work with parameters (Examples)-------------------------
/* #region Main */

// const items = [
//     {id: 1, name: 'Item1', state:true},
//     {id: 2, name: 'Item2', state:false},
//     {id: 3, name: 'Item3', state:true},
//     {id: 4, name: 'Item4', state:false},
//     {id: 5, name: 'Item5', state:false},
// ];

//192.168.123.199:6001/api/items
// app.get("/api/items/", (req, res) => {
//     //res.send([1,2,3])
//     console.log("items map");
//     console.log(items);
//     res.send(items)
// })

// //192.168.123.199:6001/api/Resource1/aaa
// app.get("/api/Resource1/:p1", (req,res)=>{
//     //res.send(req.params);
//     let Resource = items.find(c => c.id === parseInt(req.params.p1))
//     if(!Resource)
//     {
//         res.status(404).send('Given ID is not in the List')
//     }
//     else{
//         res.send(Resource)
//     }
// })
// //192.168.123.199:6001/api/Resource1/aaa/bbbb
// //Query parameters
// //192.168.123.199:6001/api/Resource1/aaa/bbb/?sortBy=name
// app.get("/api/Resource1/:p1/:p2", (req,res)=>{
//     //res.send(req.params);
//     res.send(req.query);
// })

// //{"name": "new one"} -- include in the body section 
// //Postman: - body-raw-json 
// app.post('/api/Resource1', (req, res)=>{
// const {error} = validationResource(req.body);
//     if(error){
//         res.status(400).send(error.details[0].message);
//         return;
//     }
//     const resource={
//         id:Items.length + 2,
//         name: req.body.name
//     };
//     Items.push(resource);
//     res.send(resource);
// });

// app.put("/api/Resource1/:p1", (req,res)=>{
//     let resource = items.find(c => c.id === parseInt(req.params.p1))
//     if(!resource) return res.status(404).send('Given ID is not in the List')

//     const {error} = validationResource(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//       resource.name=req.body.name;
//       res.send(resource);
// });

// app.delete("/api/Resource1/:p1", (req,res)=>{
//     let resource = items.find(c => c.id === parseInt(req.params.p1))
//     if(!resource) return res.status(404).send('Given ID is not in the List')

//     const index = Items.indexOf(resource);
//     items.splice(index,1);

//     res.send(resource);
// });

function validationResource(resource) {
    //Joi Validation
    const schema = {
        name: Joi.string().min(1).required()
    };
    return Joi.validate(resource, schema);

    //Manual validation 
    // if(!req.body.name || req.body.name.length<1){
    //    res.status(404).send('name is required')
    //    return;
    // }
}
/* #endregion */
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
