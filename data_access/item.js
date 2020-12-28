class Item {
    constructor(name, state) {
        this.item_id = 0;
        this.item_name = name;
        this.item_state = state;
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
        let sql = `UPDATE items SET name = '${this.item_name}', \
                    state = '${this.item_state}' WHERE itemID = ${item_id}`;
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