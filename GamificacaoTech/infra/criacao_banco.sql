﻿-- MySQL Script generated by MySQL Workbench
-- Wed May  1 20:30:43 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema gamificacaoBanco
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `gamificacaoBanco` ;

-- -----------------------------------------------------
-- Schema gamificacaoBanco
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gamificacaoBanco` DEFAULT CHARACTER SET utf8 ;
USE `gamificacaoBanco` ;

-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Curso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamificacaoBanco`.`Curso` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Curso` (
  `id_curso` INT NOT NULL AUTO_INCREMENT,
  `nome_curso` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_curso`),
  UNIQUE INDEX `id_curso_UNIQUE` (`id_curso` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamificacaoBanco`.`Usuario` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Usuario` (
  `ra_usuario` INT NOT NULL,
  `nome_usuario` VARCHAR(45) NOT NULL,
  `semestre_usuario` INT NOT NULL,
  `email_usuario` VARCHAR(45) NOT NULL,
  `pontos_bi` FLOAT NOT NULL,
  `pontos_dev` FLOAT NOT NULL,
  `pontos_games` FLOAT NOT NULL,
  `pontos_inov` FLOAT NOT NULL,
  `pontos_outros` FLOAT NOT NULL,
  `dt_entrada_usuario` DATE NOT NULL,
  `id_curso` INT NOT NULL,
  `senha_usuario` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`ra_usuario`),
  UNIQUE INDEX `ra_usuario_UNIQUE` (`ra_usuario` ASC),
  INDEX `fk_id_curso_usuario_idx` (`id_curso` ASC),
  CONSTRAINT `fk_id_curso_usuario`
    FOREIGN KEY (`id_curso`)
    REFERENCES `gamificacaoBanco`.`Curso` (`id_curso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamificacaoBanco`.`Habilidade` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Habilidade` (
  `id_habilidade` INT NOT NULL AUTO_INCREMENT,
  `nome_habilidade` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_habilidade`),
  UNIQUE INDEX `id_habilidade_UNIQUE` (`id_habilidade` ASC)
  )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamificacaoBanco`.`Usuario_Habilidade` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Usuario_Habilidade` (
  `id_usuario_habilidade` INT NOT NULL AUTO_INCREMENT,
  `id_usuario_usuario_habilidade` INT NOT NULL,
  `id_habilidade_usuario_habilidade` INT NOT NULL,
  `id_nivel_proficiencia_usuario_habilidade` INT NOT NULL,
  `range_habilidade_usuario` FLOAT NOT NULL,
  PRIMARY KEY (`id_usuario_habilidade`),
  UNIQUE INDEX `id_usuario_habilidade_UNIQUE` (`id_usuario_habilidade` ASC),
  CONSTRAINT `fk_id_usuario_usuario_habilidade`
    FOREIGN KEY (`id_usuario_usuario_habilidade`)
    REFERENCES `gamificacaoBanco`.`Usuario` (`ra_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_nivel_proficiencia_usuario_habilidade`
    FOREIGN KEY (`id_nivel_proficiencia_usuario_habilidade`)
    REFERENCES `gamificacaoBanco`.`Nivel_Proficiencia` (`id_nivel_proficiencia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_habilidade_usuario_habilidade`
    FOREIGN KEY (`id_habilidade_usuario_habilidade`)
    REFERENCES `gamificacaoBanco`.`Habilidade` (`id_habilidade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Tipo_projeto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamificacaoBanco`.`Tipo_projeto` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Tipo_projeto` (
  `id_tipo_projeto` INT NOT NULL AUTO_INCREMENT,
  `nome_tipo_projeto` VARCHAR(45) NOT NULL,
  `pontos_projeto` FLOAT NOT NULL,
  PRIMARY KEY (`id_tipo_projeto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Area`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamificacaoBanco`.`Area` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Area` (
  `id_area` INT NOT NULL AUTO_INCREMENT,
  `nome_area` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_area`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Projeto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamificacaoBanco`.`Projeto` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Projeto` (
  `id_projeto` INT NOT NULL AUTO_INCREMENT,
  `fk_ra_usuario` INT NOT NULL,
  `fk_id_tipo_projeto` INT NOT NULL,
  `fk_id_area` INT NOT NULL,
  `nome_projeto` VARCHAR(45) NOT NULL,
  `terminado_projeto` TINYINT NOT NULL,
  `local_projeto` VARCHAR(45) NOT NULL,
  `descricao_projeto` VARCHAR(450) NOT NULL,
  `pontos_extra` FLOAT NOT NULL,
  PRIMARY KEY (`id_projeto`),
  INDEX `fk_id_tipo_projeto_idx` (`fk_id_tipo_projeto` ASC),
  INDEX `fk_ra_usuario_idx` (`fk_ra_usuario` ASC),
  INDEX `fk_id_area_idx` (`fk_id_area` ASC),
  CONSTRAINT `fk_id_tipo_projeto_projeto`
    FOREIGN KEY (`fk_id_tipo_projeto`)
    REFERENCES `gamificacaoBanco`.`Tipo_projeto` (`id_tipo_projeto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ra_usuario_projeto`
    FOREIGN KEY (`fk_ra_usuario`)
    REFERENCES `gamificacaoBanco`.`Usuario` (`ra_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_area_projeto`
    FOREIGN KEY (`fk_id_area`)
    REFERENCES `gamificacaoBanco`.`Area` (`id_area`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamificacaoBanco`.`Item` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Item` (
  `id_item` INT NOT NULL AUTO_INCREMENT,
  `nome_item` VARCHAR(45) NOT NULL,
  `top_item` FLOAT NOT NULL,
  `bottom_item` FLOAT NOT NULL,
  `left_item` FLOAT NOT NULL,
  `right_item` FLOAT NOT NULL,
  `img_url_item` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_item`),
  UNIQUE INDEX `id_item_UNIQUE` (`id_item` ASC))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Noticia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamificacaoBanco`.`Noticia` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Noticia` (
  `id_noticia` INT NOT NULL AUTO_INCREMENT,
  `nome_noticia` VARCHAR(45) NOT NULL,
  `autor_noticia` INT NOT NULL,
  `corpo_noticia` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`id_noticia`),
  UNIQUE INDEX `id_noticia_UNIQUE` (`id_noticia` ASC),
  INDEX `autor_noticia_idx` (`autor_noticia` ASC),
  CONSTRAINT `fk_autor_noticia`
	FOREIGN KEY (`autor_noticia`)
	REFERENCES `gamificacaoBanco`.`Usuario` (`ra_usuario`)
	ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Tipo_informacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamificacaoBanco`.`Tipo_informacao` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Tipo_informacao` (
  `id_tipo_informacao` INT NOT NULL AUTO_INCREMENT,
  `nome_tipo_informacao` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_tipo_informacao`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Informacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamificacaoBanco`.`Informacao` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Informacao` (
  `id_informacao` INT NOT NULL AUTO_INCREMENT,
  `fk_id_tipo_informacao` INT NOT NULL,
  `nome_informacao` VARCHAR(45) NOT NULL,
  `texto_informacao` VARCHAR(450) NOT NULL,
  `local_informacao` VARCHAR(45) NOT NULL,
  `fk_id_area` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_informacao`),
  INDEX `fk_id_tipo_informacao_idx` (`fk_id_tipo_informacao` ASC),
  INDEX `fk_id_area_idx` (`fk_id_area` ASC),
  CONSTRAINT `fk_id_tipo_informacao`
    FOREIGN KEY (`fk_id_tipo_informacao`)
    REFERENCES `gamificacaoBanco`.`Tipo_informacao` (`id_tipo_informacao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_area_informacao`
    FOREIGN KEY (`fk_id_area`)
    REFERENCES `gamificacaoBanco`.`Area` (`id_area`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Achievement`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamificacaoBanco`.`Achievement` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Achievement` (
  `id_achievement` INT NOT NULL AUTO_INCREMENT,
  `nome_achievement` VARCHAR(45) NOT NULL,
  `criterio_achievement` VARCHAR(250) NOT NULL,
  `area_achievement` INT NOT NULL,
  PRIMARY KEY (`id_achievement`),
  INDEX `fk_area_achievement_idx` (`area_achievement` ASC),
  CONSTRAINT `fk_area_achievement`
    FOREIGN KEY (`area_achievement`)
    REFERENCES `gamificacaoBanco`.`Area` (`id_area`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Nivel PRoficiencia`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `gamificacaoBanco`.`Nivel_Proficiencia` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Nivel_Proficiencia` (
  `id_nivel_proficiencia` INT NOT NULL AUTO_INCREMENT,
  `nome_nivel_proficiencia` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_nivel_proficiencia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Achievement_Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamificacaoBanco`.`Achievement_Usuario` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Achievement_Usuario` (
  `id_achievement_usuario` INT NOT NULL AUTO_INCREMENT,
  `fk_achievement_id` INT NOT NULL,
  `fk_usuario_id` INT NOT NULL,
  `dt_semestre_achievement` INT NOT NULL,
  PRIMARY KEY (`id_achievement_usuario`),
  UNIQUE INDEX `id_achievement_usuario_UNIQUE` (`id_achievement_usuario` ASC),
  INDEX `fk_achievement_achievement_usuario_idx` (`fk_achievement_id` ASC),
  INDEX `fk_usuario_id_achievement_usuario_idx` (`fk_usuario_id` ASC),
  CONSTRAINT `fk_id_achievement_achievement_usuario`
    FOREIGN KEY (`fk_achievement_id`)
    REFERENCES `gamificacaoBanco`.`Achievement` (`id_achievement`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_id_achievement_usuario`
    FOREIGN KEY (`fk_usuario_id`)
    REFERENCES `gamificacaoBanco`.`Usuario` (`ra_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamificacaoBanco`.`Item_Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamificacaoBanco`.`Item_Usuario` ;

CREATE TABLE IF NOT EXISTS `gamificacaoBanco`.`Item_Usuario` (
  `id_item_usuario` INT NOT NULL AUTO_INCREMENT,
  `fk_item_id` INT NOT NULL,
  `fk_usuario_id` INT NOT NULL,
  `dt_semestre_item` INT NOT NULL,
  PRIMARY KEY (`id_item_usuario`),
  UNIQUE INDEX `id_Item_Usuario_UNIQUE` (`id_item_usuario` ASC),
  INDEX `fk_item_id_item_usuario_idx` (`fk_item_id` ASC),
  INDEX `fk_usuario_id_item_usuario_idx` (`fk_usuario_id` ASC),
  CONSTRAINT `fk_item_id_item_usuario`
    FOREIGN KEY (`fk_item_id`)
    REFERENCES `gamificacaoBanco`.`Item` (`id_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_id_item_usuario`
    FOREIGN KEY (`fk_usuario_id`)
    REFERENCES `gamificacaoBanco`.`Usuario` (`ra_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
