CREATE DATABASE IF NOT EXISTS `contact_tracing_system`;
USE `contact_tracing_system`;

-- define custom uuid function
DELIMITER $$
CREATE FUNCTION myUUID(
	uuidLength int
)
RETURNS varchar(255)
BEGIN

SET @chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
SET @charLen = length(@chars);

SET @myUUID = '';

WHILE length(@myUUID) < uuidLength
    DO
    SET @myUUID = concat(@myUUID, substring(@chars,CEILING(RAND() * @charLen),1));
END WHILE;

RETURN @myUUID ;
END$$
DELIMITER ;

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
  `creationTimestamp` timestamp DEFAULT current_timestamp(),
  `updateTimestamp` timestamp, -- need to manually update with queries
  `usermode` varchar(255) NOT NULL,
  `associatedVenue` varchar(255),  -- null for not associated
  `recentlyBeenToHotspot` bit DEFAULT 0,
  `allowGoogleLogin` bit NOT NULL DEFAULT 0
);

-- set up trigger to use function result as default value
DELIMITER ;;
CREATE TRIGGER `foo_user_before_insert` 
BEFORE INSERT ON `user` FOR EACH ROW 
BEGIN
  IF new.userID IS NULL THEN
    SET new.userID = myUUID(8);
  END IF;
END;;
DELIMITER ;

CREATE TABLE `address` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `line_1` varchar(255) NOT NULL,
  `line_2` varchar(255),
  `suburb` varchar(255) NOT NULL,
  `postcode` int NOT NULL
);

CREATE TABLE `venue` (
  `venueID` varchar(255) PRIMARY KEY, -- temp solution same as check-in code
  `name` varchar(255),
  `phoneNumber` int,
  `email` varchar(255),
  `address` int,
  `createdBy` varchar(255),
  `creationTimestamp` timestamp DEFAULT current_timestamp(),
  `updateTimestamp` timestamp,
  `associatedManager` varchar(255), -- null for not associated
  `isHotspot` bit DEFAULT 0,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `radius` float NOT NULL
);

-- set up trigger to use function result as default value
DELIMITER ;;
CREATE TRIGGER `foo_venue_before_insert` 
BEFORE INSERT ON `venue` FOR EACH ROW 
BEGIN
  IF new.venueID IS NULL THEN
    SET new.venueID = myUUID(8);
  END IF;
END;;
DELIMITER ;

CREATE TABLE `checkIn` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `venue` varchar(255) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `codeUsed` varchar(255)
);

CREATE TABLE `hotspotTimeframe` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdBy` varchar(255),
  `creationTimestamp` timestamp DEFAULT current_timestamp(),
  `updateTimestamp` timestamp,
  `venue` varchar(255) NOT NULL,
  `startTime` timestamp NOT NULL,
  `endTime` timestamp NOT NULL,
  `affectedUsers` int DEFAULT 0
);

CREATE TABLE `registrationCode` (
  `code` varchar(255) PRIMARY KEY,
  `createdBy` varchar(255),
  `creationTimestamp` timestamp DEFAULT current_timestamp(),
  `updateTimestamp` timestamp,
  `validityStart` timestamp NOT NULL,
  `validityEnd` timestamp NOT NULL,
  `usermode` varchar(255) NOT NULL
);

-- set up trigger to use function result as default value
DELIMITER ;;
CREATE TRIGGER `foo_registrationCode_before_insert` 
BEFORE INSERT ON `registrationCode` FOR EACH ROW 
BEGIN
  IF new.code IS NULL THEN
    SET new.code = myUUID(12);
  END IF;
END;;
DELIMITER ;

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