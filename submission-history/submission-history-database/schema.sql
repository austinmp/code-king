CREATE SCHEMA submissionHistory;
USE submissionHistory;

CREATE TABLE submissionTable(

submission int PRIMARY KEY AUTO_INCREMENT, 
userID VARCHAR(255), 
userName VARCHAR(255), 
challengeId INT(255), 
challengeName VARCHAR(255), 
programmingLanguage VARCHAR(255), 
dateSubmitted DATETIME ,
executionTime INT, 
didAllTestsPass BOOL

)