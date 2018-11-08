-- MySQL dump 10.13  Distrib 8.0.12, for osx10.12 (x86_64)
--
-- Host: localhost    Database: places
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `places`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `places` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `places`;

--
-- Table structure for table `keyword_place`
--

DROP TABLE IF EXISTS `keyword_place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `keyword_place` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `place_id` int(10) unsigned NOT NULL,
  `keyword_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `keyword_place_place_id_foreign` (`place_id`),
  KEY `keyword_place_keyword_id_foreign` (`keyword_id`),
  CONSTRAINT `keyword_place_keyword_id_foreign` FOREIGN KEY (`keyword_id`) REFERENCES `keywords` (`id`) ON DELETE CASCADE,
  CONSTRAINT `keyword_place_place_id_foreign` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyword_place`
--

LOCK TABLES `keyword_place` WRITE;
/*!40000 ALTER TABLE `keyword_place` DISABLE KEYS */;
INSERT INTO `keyword_place` VALUES (1,1,1),(2,4,1),(3,2,2),(4,3,2),(5,5,3),(6,5,1);
/*!40000 ALTER TABLE `keyword_place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keywords`
--

DROP TABLE IF EXISTS `keywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `keywords` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keywords`
--

LOCK TABLES `keywords` WRITE;
/*!40000 ALTER TABLE `keywords` DISABLE KEYS */;
INSERT INTO `keywords` VALUES (1,'Nähtävyys','2018-11-08 20:19:40','2018-11-08 20:19:40'),(2,'Ulkoilma','2018-11-08 20:19:53','2018-11-08 20:19:53'),(3,'Olut','2018-11-08 20:21:27','2018-11-08 20:21:27');
/*!40000 ALTER TABLE `keywords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (39,'2018_11_04_131709_create_places_table',1),(40,'2018_11_04_145331_create_keywords_table',1),(41,'2018_11_05_090712_create_keyword_place_table',1),(42,'2018_11_05_131136_update_place_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `places`
--

DROP TABLE IF EXISTS `places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `places` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` double(9,7) NOT NULL,
  `longitude` double(9,7) NOT NULL,
  `opens_at` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `closes_at` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places`
--

LOCK TABLES `places` WRITE;
/*!40000 ALTER TABLE `places` DISABLE KEYS */;
INSERT INTO `places` VALUES (1,'Kirjasto','Suomenlinnan vanhin ja perinteisin kirjasto.',60.1462116,24.9846877,'08:00','18:00','2006-10-31 07:40:09','2018-11-08 20:18:43'),(2,'Kasinopuisto','Hieno puisto.',60.1485000,24.9874450,'00:00','23:59','1981-11-16 21:38:37','1981-03-18 08:13:57'),(3,'Pikku-Musta','Hieno saari',60.1497970,24.9797610,'00:00','23:59','2001-08-19 01:50:30','2003-05-21 12:07:50'),(4,'Sotamuseo','Pakollinen nähtävyys. Sotamuseossa avautui uusi näyttely toukokuussa 2018.',60.1458227,24.9894453,'09:00','15:00','1994-02-05 14:29:19','2018-11-08 20:18:54'),(5,'Brewery','Suomenlinnan Panimo',60.1488324,24.9852061,'15:00','21:00','2018-11-08 20:20:36','2018-11-08 20:20:36');
/*!40000 ALTER TABLE `places` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-08 22:23:30
