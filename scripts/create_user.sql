
DROP TABLE IF EXISTS tblUser;

CREATE TABLE tblUser 
(   
    userid char(36) NOT NULL default uuid(),
    userName varchar(100) NOT NULL,
    userEmail varchar(100) NOT NULL,
    Active BOOLEAN DEFAULT 1,
    PRIMARY KEY(userid)
)
