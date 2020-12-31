const express = require('express');
const db = require('../db/database');

const Item = require('../data_access/item');
const router = express.Router();

const mqttHandler = require('../mqtt/mqtt_handler');

// var resStatus = new Enum({'Ok': 200, 'BadRequest.': 400, 'Forbidden': 403, 'NotFound': 404, 'InternalServerError': 500});
// var resCode = new Enum({'Success': 1, 'NoRecordsFound': 0, 'Error': 3});



//http://192.168.123.199:6001/items 
router.get("/", (req, res, next) => {
    db.query(Item.getAllItems(), (err, data) => {
        if (!err) {
            res.status(200).json(data);
        }
    });
});

//http://192.168.123.199:6001/items/1 
router.get("/:Id", (req, res, next) => {
    let itemID = req.params.Id;

    db.query(Item.getItemById(itemID), (err, data) => {
        if (!err) {
            if (data && data.length > 0) {
                res.status(200).json({
                    data
                });
            } else {
                res.status(200).json({
                    message: "Item Not found."
                });
            }
        }
    });
});

////http://192.168.123.199:6001/items/1 
// {"name": "Item 091","state": "true"}
router.put("/:id", (req, res) => {
    // res.send('Hello item!');

    let item_id = req.params.id;
    let item_type = req.body.type;
    let item_name = req.body.name;
    let item_state = req.body.state == true ? '1' : '0';
    let item_groupID = req.body.groupID;
    let item_macAddress = req.body.macAddress;
    let item_active = req.body.active == true ? '1' : '0';
    let item_Icon = req.body.itemIcon;

    let item = new Item(item_type, item_name, item_state, item_groupID, item_macAddress, item_active, item_Icon)

    console.log("_<<<<<<<<<<_____API___>>>>>>>");

    db.query(item.updateItemById(item_id), (err, data) => {
        if (!err) {
            // console.log(data);
            
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: "Item Updated",
                    affectedRows: data.affectedRows,
                    // resultCode: resCode.Success
                });
            } else {
                res.status(200).json({
                    message: "Item Not found.",
                    // resultCode: resCode.NoRecordsFound
                });
            }
        }
    });



//----------------MQTT Call-----------------------------------
console.log("_<<<<<<<<<<____MQTT Call-___>>>>>>>");

var mqttClient = new mqttHandler();
mqttClient.connect();

// mqttClient.sendMessage("Subject001", item_state);
mqttClient.sendMessage(item_macAddress, item_state);
// console.log(req.body);
console.log("subject :"  + item_macAddress + "State  : " + item_state);
// -------------------

});

////http://192.168.123.199:6001/items/add
// {"name": "Item 091","state": "true"}
router.post("/add", (req, res, next) => {
    //read product information from request
    let item = new Item(req.body.item_name, req.body.item_state);

    db.query(item.addItem(), (err, data) => {
        res.status(200).json({
            message: "Item added.",
            affectedRows: data.insertId
        });
    });
});

router.delete("/delete", (req, res, next) => {
    var item_id = req.body.item_id;

    db.query(Item.deleteItemById(item_id), (err, data) => {
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: `Item deleted with id = ${item_id}.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(200).json({
                    message: "Item Not found."
                });
            }
        }
    });
});

module.exports = router;
