class Item {
    constructor(type, name, state, groupID, macAddress, active, itemIcon) {
        this.itemID = 0;
        this.item_type=type;
        this.item_name = name;
        this.item_state = state;
        this.item_groupID=groupID;
        this.item_macAddress=macAddress;
        this.item_active=active;
        this.item_Icon=itemIcon;
    }

    static getAllItems() {
        let sql = `SELECT * FROM items`;
        return sql;
    }

    static getItemById(item_id) {
        let sql = `SELECT * FROM items WHERE itemID = ${item_id}`;
        return sql;
    }

    updateItemById(item_id) {
        let sql = `UPDATE items SET \
        type = '${this.item_type}', \
        state = '${this.item_state}', \
        name = '${this.item_name}', \
        groupID = '${this.item_groupID}', \
        macAddress = '${this.item_macAddress}', \
        active = '${this.item_active}', \
        itemIcon = '${this.item_Icon}' \
        WHERE itemID = ${item_id}`;

        return sql;
    }

    static updateStatusById(item_id, state) {
        let sql = `UPDATE items SET \
        state = '${state}' \
        WHERE itemID = ${item_id}`;
        
        return sql;
    }

   static updateGroupById(item_id, groupId) {
        let sql = `UPDATE items SET \
        groupID = '${groupId}' \
        WHERE itemID = ${item_id}`;
        
        return sql;
    }

    addItem() {
        let sql = `INSERT INTO items(name, state) \
                   VALUES('${this.item_name}',${this.item_state})`;
        return sql;
    }

    static deleteItemById(item_id) {
        let sql = `DELETE FROM items WHERE itemID = ${item_id}`;
        return sql;
    }

}

module.exports = Item;