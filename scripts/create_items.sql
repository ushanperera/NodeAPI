
--DROP TABLE IF EXISTS items;
-- Create items Table ---------------------
CREATE TABLE IF NOT EXISTS items(
    itemID INT AUTO_INCREMENT,
    type VARCHAR(50),
    name VARCHAR(50),
    state BOOLEAN DEFAULT 1,
    groupID INT NOT NULL,
    macAddress VARCHAR(50),
    active BOOLEAN DEFAULT 1,
    itemIcon VARCHAR(50),
    PRIMARY KEY(itemID)
);

-- Insert in to item Table --------------------------------

INSERT INTO items (type,name,state,groupID) VALUES('light','FishTank Light',1,1);
INSERT INTO items (type,name,state,groupID) VALUES('light','Main Light',1,1);
INSERT INTO items (type,name,state,groupID) VALUES('light','bulb 001',1,1);
INSERT INTO items (type,name,state,groupID) VALUES('light','Arduino',1,3);



