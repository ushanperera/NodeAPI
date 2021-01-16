class User {
    constructor(firstName, lastName, email, active, admin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.active = active == true ? '1' : '0';
        this.admin = admin == true ? '1' : '0';
    }

    static getAllUsers() {
        let sql = `SELECT * FROM tblUser`;
        return sql;
    }

    addUser() {
        let sql = `INSERT INTO tblUser (firstName,lastName,email,active,admin)\
                   VALUES('${this.firstName}','${this.lastName}','${this.email}','${this.active}','${this.admin}')`;
        return sql;
    }

    static deleteUser(userId) {
        let sql = `DELETE FROM tblUser WHERE userId = '${userId}'`;
        return sql;
    }

    updateUser(userId) {
        let sql = `UPDATE tblUser SET \
        firstName = '${this.firstName}', \
        lastName = '${this.lastName}', \
        email = '${this.email}', \
        active = '${this.active}', \
        admin = '${this.admin}' \
        WHERE userId = '${userId}'`;

        return sql;
    }

    registerUser(userName, password) {
        let sql = `INSERT INTO tblUser (userName, password)\
                   VALUES('${this.userName}', '${this.password}')`;
        return sql;
    }


}

module.exports = User;
