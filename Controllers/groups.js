const express = require('express');
const db = require('../helpers/database');

const Group = require('../Models/group');
const router = express.Router();

//http://192.168.123.199:6001/groups
router.get("/", (req, res, next) => {
    db.query(Group.getAllGroups() , (err, data) => {
        if (!err) {
            res.status(200).json(data);
        }
    });
});

//http://192.168.123.199:6001/groups/add
// {"name": "groupID 001"}
router.post("/add", (req, res, next) => {
    // res.send('Hello category!');
    let group = new Group(req.body.name);

    db.query(group.addGroup(), (err, data) => {
        res.status(200).json({
            message: "Group added.",
            groupID: data.insertId
        });
    });
});

// http://192.168.123.199:6001/groups/2
// { "name": "groupID 002" }
router.put("/:id", (req, res) => {   
    let group_id = req.params.id;
    let group_name = req.body.name;
    // res.send(req.body);

    let group = new Group(group_name);

    db.query(group.updateGroupById(group_id), (err, data) => {
        res.status(200).json({
            message: "Group Updated.",
            group_id: data.affectedRows
        });
    });
});

// http://192.168.123.199:6001/groups/delete/2
router.delete("/delete/:id", (req, res, next) => {
    var group_id = req.params.id;

    db.query(Group.deleteGroupById(group_id), (err, data) => {
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: `Group deleted with id = ${group_id}.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(200).json({
                    message: "Group Not found."
                });
            }
        }
    });
});


module.exports = router;