class User {
    constructor(firstName, lastName, email, active, admin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.active = active == true ? '1' : '0';
        this.admin = admin == true ? '1' : '0';
    }

    static getAllUsers(userId) {
        let sql = `SELECT userId, userName, password, firstName, lastName, email, admin FROM user WHERE active=1`;
        return sql;
    }

    static getUserByUserName(userName) {
        let sql = `SELECT userId, password FROM user WHERE active=1 and userName = '${userName}'`;
        return sql;
    }

    addUser() {
        let sql = `INSERT INTO user (firstName,lastName,email,active,admin)\
                   VALUES('${this.firstName}','${this.lastName}','${this.email}','${this.active}','${this.admin}')`;
        return sql;
    }

    static deleteUser(userId) {
        let sql = `DELETE FROM user WHERE userId = '${userId}'`;
        return sql;
    }

    updateUser(userId) {
        let sql = `UPDATE user SET \
        firstName = '${this.firstName}', \
        lastName = '${this.lastName}', \
        email = '${this.email}', \
        active = '${this.active}', \
        admin = '${this.admin}' \
        WHERE userId = '${userId}'`;

        return sql;
    }

    static registerUser(userName, password) {
        let sql = `INSERT INTO user (userName, password)\
                   VALUES('${userName}', '${password}')`;
        return sql;
    }


}

module.exports = User;
