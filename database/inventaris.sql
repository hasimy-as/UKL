-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2019 at 03:30 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventaris`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `emailadmin` varchar(100) NOT NULL,
  `passadmin` varchar(100) NOT NULL,
  `namaadmin` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `emailadmin`, `passadmin`, `namaadmin`) VALUES
(1, 'hasimy_admin@adminsarpra.com', 'admin1', 'admin_Hasimy');

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id_barang` int(3) NOT NULL,
  `nama_barang` varchar(100) NOT NULL,
  `jumlah_barang` int(11) NOT NULL,
  `sediaBerapa_barang` int(11) NOT NULL,
  `pinjamBerapa_barang` int(11) NOT NULL,
  `status_barang` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id_barang`, `nama_barang`, `jumlah_barang`, `sediaBerapa_barang`, `pinjamBerapa_barang`, `status_barang`) VALUES
(1, 'Kabel Olor', 100, 27, 73, 'Tersedia'),
(2, 'Tang Crimping', 40, 21, 19, 'Tersedia'),
(3, 'Laptop Cadangan', 50, 48, 2, 'Tersedia');

-- --------------------------------------------------------

--
-- Table structure for table `peminjam`
--

CREATE TABLE `peminjam` (
  `id_peminjam` int(11) NOT NULL,
  `email_peminjam` varchar(100) NOT NULL,
  `password_peminjam` varchar(100) NOT NULL,
  `nama_peminjam` varchar(100) NOT NULL,
  `kelas_peminjam` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `peminjam`
--

INSERT INTO `peminjam` (`id_peminjam`, `email_peminjam`, `password_peminjam`, `nama_peminjam`, `kelas_peminjam`) VALUES
(1, 'hasimy@telkom-sarpra.sch.id', 'user1', 'Hasimy', 'X RPL 1');

-- --------------------------------------------------------

--
-- Table structure for table `user_pinjam`
--

CREATE TABLE `user_pinjam` (
  `id_peminjam` int(11) NOT NULL,
  `nama_peminjam` varchar(100) NOT NULL,
  `kls_peminjam` varchar(10) NOT NULL,
  `nama_barang` varchar(100) NOT NULL,
  `wkt_pinjam` datetime NOT NULL,
  `wkt_kembali` datetime NOT NULL,
  `alasan` text NOT NULL,
  `verifikasi` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_pinjam`
--

INSERT INTO `user_pinjam` (`id_peminjam`, `nama_peminjam`, `kls_peminjam`, `nama_barang`, `wkt_pinjam`, `wkt_kembali`, `alasan`, `verifikasi`) VALUES
(1, 'Hammam', 'X RPL 1', 'Kabel Olor', '2000-12-21 12:01:46', '2001-12-12 11:00:00', 'Saya sangad perluh kabel owlowr.', 'Terverifikasi'),
(2, 'Pencetus yurod', 'X RPL 1', 'Kabel Olor', '1222-12-12 00:00:00', '2222-12-12 00:00:00', '121121', 'Tertolak'),
(3, 'Orang', 'X RPL 6', 'Kabel Olor', '1990-12-12 00:12:00', '2009-12-12 12:22:00', 'mau pinjem aja (/^O^)/', 'Tertolak');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id_barang`);

--
-- Indexes for table `peminjam`
--
ALTER TABLE `peminjam`
  ADD PRIMARY KEY (`id_peminjam`);

--
-- Indexes for table `user_pinjam`
--
ALTER TABLE `user_pinjam`
  ADD PRIMARY KEY (`id_peminjam`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id_barang` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `peminjam`
--
ALTER TABLE `peminjam`
  MODIFY `id_peminjam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_pinjam`
--
ALTER TABLE `user_pinjam`
  MODIFY `id_peminjam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
