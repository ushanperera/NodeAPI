const express = require('express');
const db = require('../db/database');

const Group = require('../data_access/group');
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
// {"name": "Catagory 001"}
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
// { "name": "Catagory 002" }
router.put("/:id", (req, res) => {   
    let category_id = req.params.id;
    let categoryname = req.body.name;
    // res.send(req.body);

    let group = new Group(categoryname);

    db.query(group.updateGroupById(category_id), (err, data) => {
        res.status(200).json({
            message: "Group Updated.",
            category_id: data.affectedRows
        });
    });
});

// http://192.168.123.199:6001/groups/delete/2
router.delete("/delete/:id", (req, res, next) => {
    var category_id = req.params.id;

    db.query(Group.deleteGroupById(category_id), (err, data) => {
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: `Group deleted with id = ${category_id}.`,
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