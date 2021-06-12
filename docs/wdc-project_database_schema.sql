CREATE DATABASE IF NOT EXISTS `contact_tracing_system`;
USE `contact_tracing_system`;

CREATE TABLE `user` (
  `userID` varchar(255) PRIMARY KEY,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `address` int,
  `phoneNumber` int NOT NULL UNIQUE,
  `email` varchar(255) NOT NULL UNIQUE,
  `gender` varchar(255),
  `password` char(60) NOT NULL,
  `DOB` char(8),
  `registrationCode` varchar(255),
  `creationTimestamp` timestamp,
  `updateTimestamp` timestamp,
  `usermode` varchar(255) NOT NULL,
  `associatedVenue` varchar(255),
  `recentlyBeenToHotspot` bit
);

CREATE TABLE `address` (
  `id` int PRIMARY KEY,
  `line_1` varchar(255) NOT NULL,
  `line_2` varchar(255),
  `suburb` varchar(255) NOT NULL,
  `postcode` int NOT NULL
);

CREATE TABLE `venue` (
  `venueID` varchar(255) PRIMARY KEY,
  `name` varchar(255),
  `phoneNumber` int,
  `email` varchar(255),
  `address` int,
  `createdBy` varchar(255),
  `creationTimestamp` timestamp,
  `updateTimestamp` timestamp,
  `associatedManager` varchar(255),
  `isHotspot` bit,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `radius` float NOT NULL
);

CREATE TABLE `checkIn` (
  `id` int PRIMARY KEY,
  `user` varchar(255) NOT NULL,
  `venue` varchar(255) NOT NULL,
  `time` timestamp NOT NULL,
  `codeUsed` varchar(255)
);

CREATE TABLE `hotspotTimeframe` (
  `id` int PRIMARY KEY,
  `createdBy` varchar(255),
  `creationTimestamp` timestamp,
  `updateTimestamp` timestamp,
  `venue` varchar(255) NOT NULL,
  `startTime` timestamp NOT NULL,
  `endTime` timestamp NOT NULL,
  `affectedUsers` int
);

CREATE TABLE `registrationCode` (
  `code` varchar(255) PRIMARY KEY,
  `createdBy` varchar(255),
  `creationTimestamp` timestamp,
  `updateTimestamp` timestamp,
  `validityStart` timestamp NOT NULL,
  `validityEnd` timestamp NOT NULL,
  `usermode` varchar(255) NOT NULL
);

ALTER TABLE `user` ADD FOREIGN KEY (`address`) REFERENCES `address` (`id`);

ALTER TABLE `user` ADD FOREIGN KEY (`associatedVenue`) REFERENCES `venue` (`venueID`);

ALTER TABLE `user` ADD FOREIGN KEY (`registrationCode`) REFERENCES `registrationCode` (`code`);

ALTER TABLE `venue` ADD FOREIGN KEY (`address`) REFERENCES `address` (`id`);

ALTER TABLE `venue` ADD FOREIGN KEY (`createdBy`) REFERENCES `user` (`userID`);

ALTER TABLE `venue` ADD FOREIGN KEY (`associatedManager`) REFERENCES `user` (`userID`);

ALTER TABLE `checkIn` ADD FOREIGN KEY (`user`) REFERENCES `user` (`userID`);

ALTER TABLE `checkIn` ADD FOREIGN KEY (`venue`) REFERENCES `venue` (`venueID`);

ALTER TABLE `hotspotTimeframe` ADD FOREIGN KEY (`venue`) REFERENCES `venue` (`venueID`);

ALTER TABLE `hotspotTimeframe` ADD FOREIGN KEY (`createdBy`) REFERENCES `user` (`userID`);

ALTER TABLE `registrationCode` ADD FOREIGN KEY (`createdBy`) REFERENCES `user` (`userID`);

-- data constraints
ALTER TABLE `user` ADD CHECK ((`email`) = (lower(`email`)));
ALTER TABLE `user` ADD CHECK ((`userID`) = (lower(`userID`)));
ALTER TABLE `user` ADD CHECK ((`gender`) = (lower(`gender`)));
ALTER TABLE `user` ADD CHECK ((`usermode`) = (lower(`usermode`)));

ALTER TABLE `registrationCode` ADD CHECK ((`usermode`) = (lower(`usermode`)));

ALTER TABLE `venue` ADD CHECK ((`venueID`) = (lower(`venueID`)));
ALTER TABLE `venue` ADD CHECK ((`email`) = (lower(`email`)));