CREATE TABLE `user` (
  `userID` varchar(255) PRIMARY KEY,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `address` address,
  `phoneNumber` int,
  `email` varchar(255),
  `gender` varchar(255),
  `password` varchar(255),
  `DOB` varchar(255),
  `registrationCode` varchar(255),
  `creationTimestamp` timestamp,
  `updateTimestamp` timestamp,
  `usermode` varchar(255),
  `associatedVenue` venue,
  `recentlyBeenToHotspot` bool
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
  `address` address,
  `createdBy` user,
  `creationTimestamp` timestamp,
  `updateTimestamp` timestamp,
  `associatedManager` user,
  `isHotspot` bool,
  `latitude` float,
  `longitude` float,
  `radius` float
);

CREATE TABLE `checkIn` (
  `id` int PRIMARY KEY,
  `user` user,
  `venue` venue,
  `time` timestamp,
  `codeUsed` varchar(255)
);

CREATE TABLE `hotspotTimeframe` (
  `id` int PRIMARY KEY,
  `createdBy` user,
  `creationTimestamp` timestamp,
  `updateTimestamp` timestamp,
  `venue` venue,
  `startTime` timestamp,
  `endTime` timeStamp,
  `affectedUsers` int
);

CREATE TABLE `registrationCode` (
  `code` varchar(255),
  `createdBy` user,
  `creationTimestamp` timeStamp,
  `updateTimestamp` timeStamp,
  `validityStart` timeStamp,
  `validityEnd` timeStamp,
  `usermode` varchar(255)
);

ALTER TABLE `address` ADD FOREIGN KEY (`id`) REFERENCES `user` (`address`);

ALTER TABLE `venue` ADD FOREIGN KEY (`venueID`) REFERENCES `user` (`associatedVenue`);

ALTER TABLE `address` ADD FOREIGN KEY (`id`) REFERENCES `venue` (`address`);

ALTER TABLE `user` ADD FOREIGN KEY (`userID`) REFERENCES `venue` (`createdBy`);

ALTER TABLE `user` ADD FOREIGN KEY (`userID`) REFERENCES `venue` (`associatedManager`);

ALTER TABLE `checkIn` ADD FOREIGN KEY (`user`) REFERENCES `user` (`userID`);

ALTER TABLE `checkIn` ADD FOREIGN KEY (`venue`) REFERENCES `venue` (`venueID`);

ALTER TABLE `hotspotTimeframe` ADD FOREIGN KEY (`venue`) REFERENCES `venue` (`venueID`);

ALTER TABLE `hotspotTimeframe` ADD FOREIGN KEY (`createdBy`) REFERENCES `user` (`userID`);

ALTER TABLE `registrationCode` ADD FOREIGN KEY (`createdBy`) REFERENCES `user` (`userID`);
