DROP DATABASE IF EXIST vivaDrcTest;
CREATE DATABASE vivaDrcTest;
USE vivaDrcTest;
CREATE TABLE agents (
    idAgent INT(11)  NOT NULL AUTO_INCREMENT,
    name VARCHAR(24),
    number VARCHAR(24),
    PRIMARY KEY(idAgent)
);
CREATE TABLE contacts (
    idContact INT(11)  NOT NULL AUTO_INCREMENT,
    name VARCHAR(24),
    number VARCHAR(24),
    PRIMARY KEY(idContact)
);
CREATE TABLE messages (
    idMessage INT(11) NOT NULL AUTO_INCREMENT,
    msg TEXT,
    type VARCHAR(32),
    idAgent INT(11),
    idContact INT(11),
    PRIMARY KEY(idMessage),
    FOREIGN KEY(idAgent) REFERENCES agents(idAgent),
    FOREIGN KEY(idContact) REFERENCES contacts(idContact)
);

INSERT INTO agents SET name = 'adolphe', number='+243979049362' ;



