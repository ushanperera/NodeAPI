const express = require('express');
const db = require('../db/database');

const Item = require('../data_access/item');
const router = express.Router();

const mqttHandler = require('../mqtt/mqtt_handler');


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
    let item_name = req.body.name;
    let item_state = req.body.state == true ? '1' : '0';

    let item = new Item(item_name, item_state);

    db.query(item.updateItemById(item_id), (err, data) => {
        res.status(200).json({
            message: "Item Updated.",
            item_id: data.affectedRows
        });
    });

// MQTT Call----------
var mqttClient = new mqttHandler();
mqttClient.connect();

mqttClient.sendMessage("Subject001", item_state);
console.log(req.body);
console.log(item_state);

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
            item_id: data.insertId
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