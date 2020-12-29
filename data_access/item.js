class Item {
    constructor(type, name, state, categoryID, macAddress, active, itemIcon) {
        this.itemID = 0;
        this.item_type=type;
        this.item_name = name;
        this.item_state = state;
        this.item_categoryID=categoryID;
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
        categoryID = '${this.item_categoryID}', \
        macAddress = '${this.item_macAddress}', \
        active = '${this.item_active}', \
        itemIcon = '${this.item_Icon}' \
        WHERE itemID = ${item_id}`;
        console.log (sql);
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