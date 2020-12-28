class Group {

    constructor(name) {
        this.category_id = 0;
        this.category_name = name;
    }

    static getAllGroups() {
        let sql = 'SELECT * FROM groups';
        return sql;
    }

    addGroup() {
        let sql = `INSERT INTO groups (name) \
                   VALUES('${this.category_name}')`;
        return sql;
    }

    updateGroupById(category_id) {
        let sql = `UPDATE groups SET name = '${this.category_name}'  \
            WHERE categoryID = ${category_id}`;
        return sql;
    }
    static deleteGroupById(category_id) {
        let sql = `DELETE FROM groups WHERE categoryID = ${category_id}`;
        return sql;
    }

}

module.exports = Group;