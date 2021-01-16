const express = require('express');
const db = require('../helpers/database');

const Item = require('../Models/item');
const router = express.Router();

const mqttHandler = require('../helpers/mqtt_handler');

// var resStatus = new Enum({'Ok': 200, 'BadRequest.': 400, 'Forbidden': 403, 'NotFound': 404, 'InternalServerError': 500});
// var resCode = new Enum({'Success': 1, 'NoRecordsFound': 0, 'Error': 3});

router.get("/test", (req, res, next) => {
    res.send('Hello!');
});


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
router.put("/", (req, res) => {
    // res.send('Hello item!');

    let item_id = req.body.id;
    let item_type = req.body.type;
    let item_name = req.body.name;
    let item_macAddress = req.body.macAddress;
    let item_active = req.body.active == true ? '1' : '0';
    let item_Icon = req.body.itemIcon;

    let item = new Item(item_type, item_name, item_macAddress, item_active, item_Icon)

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
});


router.put("/status", (req, res) => {
    let item_id = req.body.itemID;
    let item_state = req.body.state == true ? '1' : '0';
    let item_macAddress = req.body.macAddress;

     if(!item_id || item_id < 1){
        res.status(404).send('name is required')
        return;
     }
     else if(!item_id || item_id < 1){
        res.status(404).send('name is required')
        return;
     }

    // console.log(item_id + item_state);
    // res.send(item_id + item_state);

    db.query(Item.updateStatusById(item_id, item_state), (err, data) => {
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: "Item Updated",
                    affectedRows: data.affectedRows,
                });
            } else {
                res.status(200).json({
                    message: "Item Not found.",
                });
            }
        }
    });


    //----------------MQTT Call-----------------------------------
    var mqttClient = new mqttHandler();
    mqttClient.connect();

    // mqttClient.sendMessage("Subject001", "item_state");
    mqttClient.sendMessage(item_macAddress, item_state == "1" ? "SwitchOn" : "SwitchOff");
    // console.log(req.body);
    // console.log("subject :"  + item_macAddress + " State  : " + item_state);
    
});


router.put("/group", (req, res) => {
    let item_id = req.body.itemID;
    let item_groupID = req.body.groupID;

    // console.log(item_id + item_groupID);
    // res.send(item_id + item_groupID);

    db.query(Item.updateGroupById(item_id, item_groupID), (err, data) => {
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: "Item Updated",
                    affectedRows: data.affectedRows,
                });
            } else {
                res.status(200).json({
                    message: "Item Not found.",
                });
            }
        }
    });

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
    var item_id = req.body.itemID;

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
