
DROP TABLE IF EXISTS items;
-- Create items Table ---------------------
CREATE TABLE IF NOT EXISTS items(
    itemID INT AUTO_INCREMENT,
    type VARCHAR(50),
    name VARCHAR(50),
    state BOOLEAN DEFAULT 1,
    groupID INT,
    macAddress VARCHAR(50),
    active BOOLEAN DEFAULT 1,
    itemIcon VARCHAR(50),
    PRIMARY KEY(itemID),
    FOREIGN KEY (groupID) REFERENCES groups(groupID)
);

-- Insert in to item Table --------------------------------


INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','FishTank', true,-1,'00-D0-56-F2-B5-19',true,'light');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','Main Light', true,-1,'00-D0-56-F2-B5-20',true,'light');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','bulb 001', true,-1,'00-D0-56-F2-B5-21',true,'light');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','Arduino', true,-1,'3C:71:BF:3B:09:25',true,'light');

INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'powerPlug','Power Plug', true,-1,'00-D0-56-F2-B5-12',true,'powerPlug');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'colorLight','Color light', true,-1,'00-D0-56-F2-B5-13',true,'colorLight');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'lightStrip','Light Strip', true,-1,'00-D0-56-F2-B5-14',true,'lightStrip');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'lightString','Light String', true,-1,'00-D0-56-F2-B5-15',true,'lightString');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'powerPlug','Living Room Air Conditioner', false,-1,'00-D0-56-F2-B5-16',false,'airConditioner');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'powerPlug','Air Humidifier', false,-1,'00-D0-56-F2-B5-17',false,'airHumidifier');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'powerPlug','Master Bed Room Blinds', false,-1,'00-D0-56-F2-B5-18',false,'blinds');



INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'powerPlug','CCTV 1', false,-1,'00-D0-56-F2-B5-19',false,'ccTv');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','Balcony Wall Lamp', false,-1,'00-D0-56-F2-B5-20',false,'wallLamp');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','Bedroom Table Lamp', false,-1,'00-D0-56-F2-B5-21',false,'tableLamp');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','Living Room Floor Lamp', false,-1,'00-D0-56-F2-B5-22',false,'floorLamp');


INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'powerPlug','Main Gate ', false,-1,'00-D0-56-F2-B5-23',false,'gate');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','Balcony Wall Lamp', true,-1,'00-D0-56-F2-B5-24',true,'wallLamp');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','Bedroom Table Lamp', false,-1,'00-D0-56-F2-B5-25',false,'tableLamp');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','Living Room Floor Lamp', true,-1,'00-D0-56-F2-B5-26',true,'floorLamp');


INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'powerPlug','Garage ', true,-1,'00-D0-56-F2-B5-27',false,'garage');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'powerPlug','Main Door', true,-1,'00-D0-56-F2-B5-28',false,'door');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','Coach Lamp', false,-1,'00-D0-56-F2-B5-29',false,'coachLamp');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','Desk Lamp', false,-1,'00-D0-56-F2-B5-30',false,'deskLamp');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','Ceiling Light', true,-1,'00-D0-56-F2-B5-31',true,'ceilingLight');


INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'powerPlug','Garage A ', true,-1,'00-D0-56-F2-B5-27',false,'garage');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'powerPlug','Room Door', true,-1,'00-D0-56-F2-B5-28',false,'door');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','Coach Lamp 1', false,-1,'00-D0-56-F2-B5-29',false,'coachLamp');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','Desk Lamp 1 ', false,-1,'00-D0-56-F2-B5-30',false,'deskLamp');
INSERT INTO items (type,name,state,groupID,macAddress,active,itemIcon) VALUES( 'light','Ceiling Light2 ', true,-1,'00-D0-56-F2-B5-31',true,'ceilingLight');

