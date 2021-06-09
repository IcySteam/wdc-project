CREATE DATABASE contact_tracing_system;
USE contact_tracing_system;

CREATE TABLE `user` (
  `userID` varchar(255) PRIMARY KEY,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `address` int,
  `phoneNumber` int,
  `email` varchar(255),
  `gender` varchar(255),
  `password` varchar(255),
  `DOB` varchar(255),
  `registrationCode` varchar(255),
  `creationTimestamp` timestamp,
  `updateTimestamp` timestamp,
  `usermode` varchar(255),
  `associatedVenue` varchar(255),
  `recentlyBeenToHotspot` bit
);

CREATE TABLE `address` (
  `id` int PRIMARY KEY,
  `line_1` varchar(255),
  `line_2` varchar(255),
  `suburb` varchar(255),
  `postcode` int
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
  `latitude` float,
  `longitude` float,
  `radius` float
);

CREATE TABLE `checkIn` (
  `id` int PRIMARY KEY,
  `user` varchar(255),
  `venue` varchar(255),
  `time` timestamp,
  `codeUsed` varchar(255)
);

CREATE TABLE `hotspotTimeframe` (
  `id` int PRIMARY KEY,
  `createdBy` varchar(255),
  `creationTimestamp` timestamp,
  `updateTimestamp` timestamp,
  `venue` varchar(255),
  `startTime` timestamp,
  `endTime` timestamp,
  `affectedUsers` int
);

CREATE TABLE `registrationCode` (
  `code` varchar(255) PRIMARY KEY,
  `createdBy` varchar(255),
  `creationTimestamp` timestamp,
  `updateTimestamp` timestamp,
  `validityStart` timestamp,
  `validityEnd` timestamp,
  `usermode` varchar(255)
);

ALTER TABLE `user` ADD FOREIGN KEY (`address`) REFERENCES `address` (`id`);

ALTER TABLE `user` ADD FOREIGN KEY (`associatedVenue`) REFERENCES `venue` (`venueID`);

ALTER TABLE `venue` ADD FOREIGN KEY (`address`) REFERENCES `address` (`id`);

ALTER TABLE `venue` ADD FOREIGN KEY (`createdBy`) REFERENCES `user` (`userID`);

ALTER TABLE `venue` ADD FOREIGN KEY (`associatedManager`) REFERENCES `user` (`userID`);

ALTER TABLE `checkIn` ADD FOREIGN KEY (`user`) REFERENCES `user` (`userID`);

ALTER TABLE `checkIn` ADD FOREIGN KEY (`venue`) REFERENCES `venue` (`venueID`);

ALTER TABLE `hotspotTimeframe` ADD FOREIGN KEY (`venue`) REFERENCES `venue` (`venueID`);

ALTER TABLE `hotspotTimeframe` ADD FOREIGN KEY (`createdBy`) REFERENCES `user` (`userID`);

ALTER TABLE `registrationCode` ADD FOREIGN KEY (`createdBy`) REFERENCES `user` (`userID`);
