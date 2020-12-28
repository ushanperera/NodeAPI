class Group {

    constructor(name) {
        this.group_id = 0;
        this.group_name = name;
    }

    static getAllGroups() {
        let sql = 'SELECT * FROM groups';
        return sql;
    }

    addGroup() {
        let sql = `INSERT INTO groups (name) \
                   VALUES('${this.group_name}')`;
        return sql;
    }

    updateGroupById(group_id) {
        let sql = `UPDATE groups SET name = '${this.group_name}'  \
            WHERE groupID = ${group_id}`;
        return sql;
    }
    static deleteGroupById(group_id) {
        let sql = `DELETE FROM groups WHERE groupID = ${group_id}`;
        return sql;
    }

}

module.exports = Group;