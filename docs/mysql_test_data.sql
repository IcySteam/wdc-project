USE contact_tracing_system;

INSERT INTO `venue` (`venueID`, `name`, `latitude`, `longitude`, `radius`, `isHotspot`) VALUES ('venue01', 'Adelaide Central Market', -34.9295, 138.5973, 99.5, 'yes');
INSERT INTO `venue` (`venueID`, `name`, `latitude`, `longitude`, `radius`, `isHotspot`) VALUES ('venue02', 'Adelaide Bonanic Garden', -34.9174, 138.6100, 210.07, 'yes');
INSERT INTO `venue` (`venueID`, `name`, `latitude`, `longitude`, `radius`) VALUES ('venue03', 'Chinatown Adelaide South Australia Inc.', -34.930528, 138.595978, 155.6);

INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`) VALUES ('test01', 'Don', 'Joe', 0400000001, 'test01@example.com', 'male', '$2a$08$M4tlVv0xcg35WVmvWuRKMedbACVrjc.REwkJzpEBwfHxZ1VN3M0gi', '19700101', 'user'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`, `associatedVenue`) VALUES ('test02', 'Jane', 'Doe', 0400000002, 'test02@example.com', 'female', '$2a$08$g3/ioFsBAaouD8DFFfn8iuW.KaIim.YkYF./SqVN2oyqy1PUWIFgC', '19700101', 'manager', 'venue01'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`) VALUES ('test03', 'John', 'Wick', 0400000003, 'test03@example.com', 'male', '$2a$08$HKfOkucql7AqZ/oVasRPb.T29zh3vosHekYYdylqK39H.izlUmzv2', '19700101', 'admin'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`, `allowGoogleLogin`) VALUES ('icysteam', 'Jun', 'W.', 0400000888, 'junguo.vv@gmail.com', 'male', '$2a$08$cwdJqf4rFEhxqouM7i08BO4F5.SMwjmf/Yot/8LNHv6FS7M1eb0aG', '19700101', 'admin', 'yes'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`) VALUES ('user01', 'User', '01', 0400000101, 'user01@example.com', 'other', '$2a$08$M4tlVv0xcg35WVmvWuRKMedbACVrjc.REwkJzpEBwfHxZ1VN3M0gi', '19700101', 'user'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`) VALUES ('user02', 'User', '02', 0400000102, 'user02@example.com', 'other', '$2a$08$M4tlVv0xcg35WVmvWuRKMedbACVrjc.REwkJzpEBwfHxZ1VN3M0gi', '19700101', 'user'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`) VALUES ('user03', 'User', '03', 0400000103, 'user03@example.com', 'other', '$2a$08$M4tlVv0xcg35WVmvWuRKMedbACVrjc.REwkJzpEBwfHxZ1VN3M0gi', '19700101', 'user'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`) VALUES ('user04', 'User', '04', 0400000104, 'user04@example.com', 'other', '$2a$08$M4tlVv0xcg35WVmvWuRKMedbACVrjc.REwkJzpEBwfHxZ1VN3M0gi', '19700101', 'user'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`, `associatedVenue`) VALUES ('manager01', 'Manager', '01', 0400000201, 'manager01@example.com', 'other', '$2a$08$M4tlVv0xcg35WVmvWuRKMedbACVrjc.REwkJzpEBwfHxZ1VN3M0gi', '19700101', 'manager', 'venue02'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`, `associatedVenue`) VALUES ('manager02', 'Manager', '02', 0400000202, 'manager02@example.com', 'other', '$2a$08$M4tlVv0xcg35WVmvWuRKMedbACVrjc.REwkJzpEBwfHxZ1VN3M0gi', '19700101', 'manager', 'venue03'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`) VALUES ('manager03', 'Manager', '03', 0400000203, 'manager03@example.com', 'other', '$2a$08$M4tlVv0xcg35WVmvWuRKMedbACVrjc.REwkJzpEBwfHxZ1VN3M0gi', '19700101', 'manager'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`) VALUES ('manager04', 'Manager', '04', 0400000204, 'manager04@example.com', 'other', '$2a$08$M4tlVv0xcg35WVmvWuRKMedbACVrjc.REwkJzpEBwfHxZ1VN3M0gi', '19700101', 'manager'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`) VALUES ('admin01', 'Admin', '01', 0400000301, 'admin01@example.com', 'other', '$2a$08$M4tlVv0xcg35WVmvWuRKMedbACVrjc.REwkJzpEBwfHxZ1VN3M0gi', '19700101', 'admin'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`) VALUES ('admin02', 'Admin', '02', 0400000302, 'admin02@example.com', 'other', '$2a$08$M4tlVv0xcg35WVmvWuRKMedbACVrjc.REwkJzpEBwfHxZ1VN3M0gi', '19700101', 'admin'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`) VALUES ('admin03', 'Admin', '03', 0400000303, 'admin03@example.com', 'other', '$2a$08$M4tlVv0xcg35WVmvWuRKMedbACVrjc.REwkJzpEBwfHxZ1VN3M0gi', '19700101', 'admin'); -- 12345678
INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`) VALUES ('admin04', 'Admin', '04', 0400000304, 'admin04@example.com', 'other', '$2a$08$M4tlVv0xcg35WVmvWuRKMedbACVrjc.REwkJzpEBwfHxZ1VN3M0gi', '19700101', 'admin'); -- 12345678

UPDATE `venue` SET venue.associatedManager = 'test02' WHERE venue.venueID = 'venue01';
UPDATE `venue` SET venue.associatedManager = 'manager01' WHERE venue.venueID = 'venue02';
UPDATE `venue` SET venue.associatedManager = 'manager02' WHERE venue.venueID = 'venue03';

INSERT INTO `checkIn` (`user`, `venue`, `time`, `latitude`, `longitude`) VALUES ('user01', 'venue01', timestamp("2020-07-23",  "13:10:11"), -34.9295, 138.5973);
INSERT INTO `checkIn` (`user`, `venue`, `time`, `latitude`, `longitude`) VALUES ('user01', 'venue02', timestamp("2020-07-24",  "14:10:11"), -34.9174, 138.6100);
INSERT INTO `checkIn` (`user`, `venue`, `time`, `latitude`, `longitude`) VALUES ('user02', 'venue01', timestamp("2020-07-25",  "15:10:11"), -34.9295, 138.5973);
INSERT INTO `checkIn` (`user`, `venue`, `time`, `latitude`, `longitude`) VALUES ('user02', 'venue02', timestamp("2020-07-26",  "16:10:11"), -34.9174, 138.6100);

INSERT INTO `hotspotTimeframe` (`venue`, `startTime`, `endTime`, `affectedUsers`) VALUES ('venue01', timestamp("2019-12-03",  "16:10:11"), timestamp("2029-07-28",  "17:30:22"), 10);
INSERT INTO `hotspotTimeframe` (`venue`, `startTime`, `endTime`, `affectedUsers`) VALUES ('venue02', timestamp("2020-01-03",  "16:10:12"), timestamp("2030-08-28",  "17:30:23"), 12);

INSERT INTO `registrationCode` (`code`, `validityStart`, `validityEnd`, `usermode`) VALUES ('manager123', timestamp("2019-12-03",  "16:10:11"), timestamp("2029-07-28",  "17:30:22"), 'manager');
INSERT INTO `registrationCode` (`code`, `validityStart`, `validityEnd`, `usermode`) VALUES ('admin123', timestamp("2020-01-03",  "16:10:12"), timestamp("2030-08-28",  "17:30:23"), 'admin');