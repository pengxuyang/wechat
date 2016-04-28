/*
Navicat MySQL Data Transfer

Source Server         : pxy
Source Server Version : 50541
Source Host           : localhost:3306
Source Database       : ad-plus

Target Server Type    : MYSQL
Target Server Version : 50541
File Encoding         : 65001

Date: 2016-01-12 23:29:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `ad_group`
-- ----------------------------
DROP TABLE IF EXISTS `ad_group`;
CREATE TABLE `ad_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  `province` varchar(50) DEFAULT NULL COMMENT '省',
  `city` varchar(50) DEFAULT NULL COMMENT '市',
  `landmark_building` varchar(100) DEFAULT NULL COMMENT '标志性建筑',
  `gender` varchar(2) DEFAULT NULL COMMENT '目标性别',
  `age_group` varchar(10) DEFAULT '' COMMENT '投放年龄段（12-18,18-25,25-35,35+）',
  `ad_like` varchar(500) DEFAULT '投放喜好',
  `launch_time_start` time DEFAULT NULL COMMENT '投放起始时间',
  `launch_time_end` time DEFAULT NULL COMMENT '投放结束时间',
  `job_role` varchar(100) DEFAULT NULL COMMENT '工作角色:在校（初中、高、大学及以上），在职（管理层，程序员，职员，自定义）',
  `income` varchar(255) DEFAULT NULL,
  `consumption_capacity` varchar(255) DEFAULT NULL COMMENT '按月五千，1,2,3,5+',
  `Launch_budget` decimal(12,0) DEFAULT NULL COMMENT '投放预算',
  `pv` decimal(12,0) DEFAULT NULL COMMENT '每日消费',
  `uv` decimal(12,0) DEFAULT NULL COMMENT '每日消费',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ad_group
-- ----------------------------

-- ----------------------------
-- Table structure for `material`
-- ----------------------------
DROP TABLE IF EXISTS `material`;
CREATE TABLE `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `content` mediumblob NOT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of material
-- ----------------------------

-- ----------------------------
-- Table structure for `target`
-- ----------------------------
DROP TABLE IF EXISTS `target`;
CREATE TABLE `target` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `target_url` varchar(255) NOT NULL,
  `link_url` varchar(255) DEFAULT NULL,
  `display_type` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `material_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of target
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mobilephone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `compnay` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `user_role` varchar(24) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobilephone` (`mobilephone`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '123456', 'e10adc3949ba59abbe56e057f20f883e', '123456', '123456', '2016-01-03 14:41:54', 'cust');

-- ----------------------------
-- Table structure for `user_group`
-- ----------------------------
DROP TABLE IF EXISTS `user_group`;
CREATE TABLE `user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_user_id` int(11) DEFAULT NULL,
  `client_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_group
-- ----------------------------
