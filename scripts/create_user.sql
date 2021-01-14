
DROP TABLE IF EXISTS tblUser;

CREATE TABLE tblUser 
(   
    userId char(36) NOT NULL default uuid(),
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    active BOOLEAN DEFAULT 1,
    admin BOOLEAN DEFAULT 1,
    PRIMARY KEY(userid)
)
