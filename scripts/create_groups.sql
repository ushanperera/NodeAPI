
--DROP TABLE IF EXISTS  groups;
-- Create groups Table ---------------------

CREATE TABLE IF NOT EXISTS groups
(
categoryID int AUTO_INCREMENT PRIMARY KEY, 
name varchar(50)
);

-- Insert in to groups Table --------------------------------
INSERT INTO groups (categoryID, name) VALUES (1, 'Catagory 001');
INSERT INTO groups (categoryID, name) VALUES (3, 'Catagory 002');
INSERT INTO groups (categoryID, name) VALUES (5, 'New Group');


