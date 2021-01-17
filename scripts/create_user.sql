
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` 
(   
    userId char(36) NOT NULL default uuid(),
    userName varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    active BOOLEAN DEFAULT 1,
    admin BOOLEAN DEFAULT 0,
    PRIMARY KEY(userid)
)

INSERT INTO `user` (`userId`, `userName`, `password`, `firstName`, `lastName`, `email`, `active`, `admin`) VALUES
('uuid()', 'usr001', '123', 'John', 'Smith', 'john@gmail.com', 1, 0);

