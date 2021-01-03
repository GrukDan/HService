-- MySQL Script generated by MySQL Workbench
-- Sun Dec 13 17:15:36 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema hservicedb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema hservicedb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hservicedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hservicedb` DEFAULT CHARACTER SET utf8 ;
USE `hservicedb` ;

-- -----------------------------------------------------
-- Table `hservicedb`.`command`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`command` (
  `command_id` INT(11) NOT NULL AUTO_INCREMENT,
  `command_name` VARCHAR(60) NOT NULL,
  `creation_date` DATETIME NOT NULL,
  PRIMARY KEY (`command_id`),
  UNIQUE INDEX `command_name_UNIQUE` (`command_name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`description`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`description` (
  `description_id` INT(11) NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`description_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`priority`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`priority` (
  `priority_id` INT(11) NOT NULL AUTO_INCREMENT,
  `priority_name` VARCHAR(45) NOT NULL,
  `description` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`priority_id`),
  INDEX `description_priority_idx` (`description` ASC),
  CONSTRAINT `description_priority`
    FOREIGN KEY (`description`)
    REFERENCES `hservicedb`.`description` (`description_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`role` (
  `role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`user` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NULL DEFAULT NULL,
  `first_name` VARCHAR(45) NULL DEFAULT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `role` INT(11) NOT NULL,
  `position` VARCHAR(45) NULL DEFAULT NULL,
  `department` VARCHAR(45) NULL DEFAULT NULL,
  `place_of_residence` VARCHAR(45) NULL DEFAULT NULL,
  `last_activity` DATETIME NULL DEFAULT NULL,
  `avatar_url` VARCHAR(255) NULL DEFAULT NULL,
  `date_of_registration` DATETIME NULL DEFAULT NULL,
  `status` VARCHAR(45) NOT NULL,
  `expiration_time` DATETIME NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `password_UNIQUE` (`password` ASC),
  INDEX `user_role_idx` (`role` ASC),
  CONSTRAINT `user_role`
    FOREIGN KEY (`role`)
    REFERENCES `hservicedb`.`role` (`role_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`project` (
  `project_id` INT(11) NOT NULL AUTO_INCREMENT,
  `project_name` VARCHAR(45) NOT NULL,
  `project_code` VARCHAR(45) NOT NULL,
  `lead` INT(11) NULL DEFAULT NULL,
  `creation_date` DATE NOT NULL,
  `project_description` INT(11) NULL DEFAULT NULL,
  `sprint_time` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  UNIQUE INDEX `project_code_UNIQUE` (`project_code` ASC),
  UNIQUE INDEX `project_name_UNIQUE` (`project_name` ASC),
  INDEX `description_project_description_idx` (`project_description` ASC),
  INDEX `lead_project_idx` (`lead` ASC),
  CONSTRAINT `description_project_description`
    FOREIGN KEY (`project_description`)
    REFERENCES `hservicedb`.`description` (`description_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `lead_project`
    FOREIGN KEY (`lead`)
    REFERENCES `hservicedb`.`user` (`user_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`status` (
  `status_id` INT(11) NOT NULL AUTO_INCREMENT,
  `status_name` VARCHAR(45) NOT NULL,
  `description` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`status_id`),
  INDEX `description_status_idx` (`description` ASC),
  CONSTRAINT `description_status`
    FOREIGN KEY (`description`)
    REFERENCES `hservicedb`.`description` (`description_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`type` (
  `type_id` INT(11) NOT NULL AUTO_INCREMENT,
  `type_name` VARCHAR(45) NOT NULL,
  `description` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`type_id`),
  INDEX `description_type_idx` (`description` ASC),
  CONSTRAINT `description_type`
    FOREIGN KEY (`description`)
    REFERENCES `hservicedb`.`description` (`description_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`task` (
  `task_id` INT(11) NOT NULL AUTO_INCREMENT,
  `task_name` VARCHAR(45) NULL DEFAULT NULL,
  `task_code` VARCHAR(45) NOT NULL,
  `project` INT(11) NOT NULL,
  `task_creator` INT(11) NULL DEFAULT NULL,
  `task_executor` INT(11) NULL DEFAULT NULL,
  `type` INT(11) NOT NULL,
  `priority` INT(11) NOT NULL,
  `status` INT(11) NOT NULL,
  `description` INT(11) NULL DEFAULT NULL,
  `created` DATETIME NOT NULL,
  `updated` DATETIME NOT NULL,
  `due_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  INDEX `description_task_idx` (`description` ASC),
  INDEX `priority_task_idx` (`priority` ASC),
  INDEX `status_task_idx` (`status` ASC),
  INDEX `type_task_idx` (`type` ASC),
  INDEX `user_creator_idx` (`task_creator` ASC),
  INDEX `user_executor_idx` (`task_executor` ASC),
  INDEX `project_task_idx` (`project` ASC),
  CONSTRAINT `description_task`
    FOREIGN KEY (`description`)
    REFERENCES `hservicedb`.`description` (`description_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `priority_task`
    FOREIGN KEY (`priority`)
    REFERENCES `hservicedb`.`priority` (`priority_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `project_task`
    FOREIGN KEY (`project`)
    REFERENCES `hservicedb`.`project` (`project_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `status_task`
    FOREIGN KEY (`status`)
    REFERENCES `hservicedb`.`status` (`status_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `type_task`
    FOREIGN KEY (`type`)
    REFERENCES `hservicedb`.`type` (`type_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_creator`
    FOREIGN KEY (`task_creator`)
    REFERENCES `hservicedb`.`user` (`user_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `user_executor`
    FOREIGN KEY (`task_executor`)
    REFERENCES `hservicedb`.`user` (`user_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`comment` (
  `comment_id` INT(11) NOT NULL AUTO_INCREMENT,
  `task` INT(11) NOT NULL,
  `commentator` INT(11) NOT NULL,
  `content` TEXT NOT NULL,
  `creation_time` DATETIME NOT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `task_comment_idx` (`task` ASC),
  INDEX `user_comment_idx` (`commentator` ASC),
  CONSTRAINT `task_comment`
    FOREIGN KEY (`task`)
    REFERENCES `hservicedb`.`task` (`task_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_comment`
    FOREIGN KEY (`commentator`)
    REFERENCES `hservicedb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`history` (
  `history_id` INT(11) NOT NULL AUTO_INCREMENT,
  `task` INT(11) NOT NULL,
  `changer` INT(11) NULL DEFAULT NULL,
  `change_time` DATETIME NOT NULL,
  `action` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`history_id`),
  INDEX `task_history_idx` (`task` ASC),
  INDEX `user_history_idx` (`changer` ASC),
  CONSTRAINT `task_history`
    FOREIGN KEY (`task`)
    REFERENCES `hservicedb`.`task` (`task_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_history`
    FOREIGN KEY (`changer`)
    REFERENCES `hservicedb`.`user` (`user_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`link`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`link` (
  `link_id` INT(11) NOT NULL AUTO_INCREMENT,
  `link_name` VARCHAR(45) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `command` INT(11) NOT NULL,
  `description` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`link_id`),
  INDEX `command_link_idx` (`command` ASC),
  INDEX `description_link_idx` (`description` ASC),
  CONSTRAINT `command_link`
    FOREIGN KEY (`command`)
    REFERENCES `hservicedb`.`command` (`command_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `description_link`
    FOREIGN KEY (`description`)
    REFERENCES `hservicedb`.`description` (`description_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`log_time`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`log_time` (
  `log_time_id` INT(11) NOT NULL AUTO_INCREMENT,
  `work_time` VARCHAR(45) NOT NULL,
  `task` INT(11) NOT NULL,
  `executor` INT(11) NOT NULL,
  `activity_type` INT(11) NOT NULL,
  `description` INT(11) NULL DEFAULT NULL,
  `logging_time` DATETIME NOT NULL,
  PRIMARY KEY (`log_time_id`),
  INDEX `task_log_time_idx` (`task` ASC),
  INDEX `user_log_time_idx` (`executor` ASC),
  INDEX `description_log_time_idx` (`description` ASC),
  INDEX `type_log_time_idx` (`activity_type` ASC),
  CONSTRAINT `description_log_time`
    FOREIGN KEY (`description`)
    REFERENCES `hservicedb`.`description` (`description_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `task_log_time`
    FOREIGN KEY (`task`)
    REFERENCES `hservicedb`.`task` (`task_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `type_log_time`
    FOREIGN KEY (`activity_type`)
    REFERENCES `hservicedb`.`type` (`type_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_log_time`
    FOREIGN KEY (`executor`)
    REFERENCES `hservicedb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`membership`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`membership` (
  `user_id` INT(11) NOT NULL,
  `command_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`, `command_id`),
  INDEX `command_memberchip_idx` (`command_id` ASC),
  CONSTRAINT `command_memberchip`
    FOREIGN KEY (`command_id`)
    REFERENCES `hservicedb`.`command` (`command_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_membership`
    FOREIGN KEY (`user_id`)
    REFERENCES `hservicedb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`message` (
  `message_id` INT(11) NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `author` INT(11) NOT NULL,
  `creation_date` DATETIME NOT NULL,
  `command` INT(11) NOT NULL,
  PRIMARY KEY (`message_id`),
  INDEX `user_message_idx` (`author` ASC),
  INDEX `command_message_idx` (`command` ASC),
  CONSTRAINT `command_message`
    FOREIGN KEY (`command`)
    REFERENCES `hservicedb`.`command` (`command_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_message`
    FOREIGN KEY (`author`)
    REFERENCES `hservicedb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hservicedb`.`user_project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hservicedb`.`user_project` (
  `user_id` INT(11) NOT NULL,
  `project_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`, `project_id`),
  INDEX `project_id_user_project_idx` (`project_id` ASC),
  CONSTRAINT `project_id_user_project`
    FOREIGN KEY (`project_id`)
    REFERENCES `hservicedb`.`project` (`project_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_id_user_project`
    FOREIGN KEY (`user_id`)
    REFERENCES `hservicedb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
