-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Mar 02, 2024 at 06:08 PM
-- Server version: 5.7.44
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `Renterpurchasedetails` varchar(255) CHARACTER SET utf8 NOT NULL,
  `Rentalpurchaseconditions` varchar(255) CHARACTER SET utf8 NOT NULL,
  `Location` text CHARACTER SET utf8 NOT NULL,
  `scale` int(11) NOT NULL,
  `Usagestatus` enum('เช่า','ขาย','ไม่มีการซื้อขาย') CHARACTER SET utf8 NOT NULL,
  `Maintenance` text CHARACTER SET utf8 NOT NULL,
  `Monthlyexpenses` text CHARACTER SET utf8 NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `Renterpurchasedetails`, `Rentalpurchaseconditions`,`Location`, `scale`, `Usagestatus`, `Maintenance`, `Monthlyexpenses`) VALUES
(1, 'aaa', 'aaa', 22, 'หญิง', 'aaa', 'aaa'),
(3, 'bbb', 'bbb', 11, 'หญิง', 'bbb', 'bbb'),
(4, 'bbb', 'bbb', 11, 'หญิง', 'bbb', 'bbb'),
(5, 'bbb', 'bbb', 11, 'หญิง', 'bbb', 'bbb'),
(6, 'bbb', 'bbb', 11, 'หญิง', 'bbb', 'bbb');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
