-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2022 at 07:33 AM
-- Server version: 10.4.18-MariaDB-log
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_penjualan_kamera`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_pegawai`
--

CREATE TABLE `detail_pegawai` (
  `id_pegawai` varchar(22) NOT NULL,
  `id_login` varchar(22) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` text NOT NULL,
  `no_telepon` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_pegawai`
--

INSERT INTO `detail_pegawai` (`id_pegawai`, `id_login`, `nama`, `alamat`, `no_telepon`) VALUES
('wxsTnaeLdcbzt9YGZnq4UG', 'j62PBiefwUDzSXTimXefaj', 'Neo Jarmawijaya', 'Jl. Jakarta', '082128378829');

-- --------------------------------------------------------

--
-- Table structure for table `login_pegawai`
--

CREATE TABLE `login_pegawai` (
  `id_login` varchar(22) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login_pegawai`
--

INSERT INTO `login_pegawai` (`id_login`, `username`, `password`) VALUES
('j62PBiefwUDzSXTimXefaj', 'neoj', 'neoj');

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id_produk` varchar(22) NOT NULL,
  `nama_produk` varchar(30) NOT NULL,
  `stok_produk` int(5) NOT NULL,
  `harga_produk` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id_produk`, `nama_produk`, `stok_produk`, `harga_produk`) VALUES
('oHXP32WbgsqhSDyfCLj9Lh', 'Canon EOS RP Mirrorless', 2, 15000000),
('sFydaDmPHPnR4V9TrULeTY', 'Sony Cyber-shot DSC-W830', 7, 2200000);

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` varchar(36) NOT NULL,
  `id_pegawai` varchar(22) NOT NULL,
  `id_produk` varchar(22) NOT NULL,
  `tanggal_transaksi` date NOT NULL,
  `kuantitas` int(5) NOT NULL,
  `total_harga` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_pegawai`, `id_produk`, `tanggal_transaksi`, `kuantitas`, `total_harga`) VALUES
('98024cec-d2d2-4b9e-be92-257c61681ec3', 'wxsTnaeLdcbzt9YGZnq4UG', 'oHXP32WbgsqhSDyfCLj9Lh', '2022-04-10', 1, 15000000),
('d34d70a4-da77-4218-9114-9c8af79e276d', 'wxsTnaeLdcbzt9YGZnq4UG', 'sFydaDmPHPnR4V9TrULeTY', '2022-04-10', 2, 4400000);

--
-- Triggers `transaksi`
--
DELIMITER $$
CREATE TRIGGER `on_delete` AFTER DELETE ON `transaksi` FOR EACH ROW BEGIN
	UPDATE produk SET stok_produk = stok_produk + OLD.kuantitas
	WHERE id_produk = OLD.id_produk;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `on_insert` AFTER INSERT ON `transaksi` FOR EACH ROW BEGIN
	UPDATE produk SET stok_produk = stok_produk - NEW.kuantitas
	WHERE id_produk = NEW.id_produk;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_pegawai`
--
ALTER TABLE `detail_pegawai`
  ADD PRIMARY KEY (`id_pegawai`);

--
-- Indexes for table `login_pegawai`
--
ALTER TABLE `login_pegawai`
  ADD PRIMARY KEY (`id_login`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_produk`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
