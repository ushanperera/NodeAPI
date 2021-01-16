
DROP TABLE IF EXISTS tblUser;

CREATE TABLE tblUser 
(   
    userId char(36) NOT NULL default uuid(),
    userName varchar(100) NOT NULL,
    [password] varchar(100) NOT NULL,
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    active BOOLEAN DEFAULT 1,
    [admin] BOOLEAN DEFAULT 1,
    PRIMARY KEY(userid)
)
