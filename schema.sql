
CREATE DATABASE scoreboard;

USE scoreboard;


-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Scores'
-- 
-- ---

DROP TABLE IF EXISTS `Scores`;
		
CREATE TABLE `Scores` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `winner` VARCHAR(30) NULL DEFAULT NULL,
  `opponent` VARCHAR(30) NULL DEFAULT NULL,
  `score` INT NOT NULL DEFAULT NULL,
   `promptid` INT NOT NULL DEFAULT NULL,
  `submittedcode` VARCHAR(MAX) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `Prompts`;
		
CREATE TABLE `Prompts` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `prompt` VARCHAR(30) NULL DEFAULT NULL,
  'promptpath' VARCHAR(MAX) NULL DEFAULT NULL,
  `testpath`  VARCHAR(MAX) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);



-- ---
-- Foreign Keys 
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Scores` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Scores` (`id`,`username`,`opponent`,`userscore`,`prompt`,`submittedcode`,`new field`) VALUES
-- ('','','','','','','');

