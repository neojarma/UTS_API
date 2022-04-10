const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

// generate UID
const generateUID = require('short-uuid');

pool.on('error', (err) => {
    console.log(err)
});

module.exports = {
    // Product Section
    getAllProduct(req, res) {
        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'SELECT * FROM produk';
            connection.query(query, function(err, result) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Fetch data successfully',
                    data: result
                })
            })

            connection.release();
        })
    },
    getSpecificProduct(req, res) {
        const id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'SELECT * FROM produk WHERE id_produk = ?';
            connection.query(query, [id], function(err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Fetch data successfully',
                    data: result
                })
            })

            connection.release();
        })
    },
    postNewProduct(req, res) {
        // parse data
        const {
            nama_produk,
            stok_produk,
            harga_produk
        } = req.body

        // generate id_produk
        const id_produk = generateUID.generate();

        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'INSERT INTO produk VALUES (?, ?, ?, ?)';
            connection.query(query, [id_produk, nama_produk, stok_produk, harga_produk], function(err, result) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Your record has been saved successfully',
                })
            })

            connection.release();
        })
    },
    updateProduct(req, res) {
        const id = req.params.id;

        // parse data
        const data = {
            nama_produk: req.body.nama_produk,
            stok_produk: req.body.stok_produk,
            harga_produk: req.body.harga_produk,
        }

        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'UPDATE produk SET ? WHERE id_produk = ? ';
            connection.query(query, [data, id], function(err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Updated successfully',
                })
            })

            connection.release();
        })
    },
    deleteProduct(req, res) {
        const id = req.params.id;

        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'DELETE FROM produk WHERE id_produk = ?';
            connection.query(query, [id], function(err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Deleted successfully',
                })
            })

            connection.release();
        })
    },

    // login_pegawai section
    updateLoginPegawai(req, res) {
        const id = req.params.id;

        // parse data
        const data = {
            username: req.body.newUsername,
            password: req.body.newPassword
        }

        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'UPDATE login_pegawai SET ? WHERE id_login = ? ';
            connection.query(query, [data, id], function(err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Updated successfully',
                })
            })

            connection.release();
        })
    },
    deleteLoginPegawai(req, res) {
        const id = req.params.id;

        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'DELETE FROM login_pegawai WHERE id_login = ?';
            connection.query(query, [id], function(err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Deleted successfully',
                })
            })

            connection.release();
        })
    },

    // detail_pegawai section
    getAllEmployee(req, res) {
        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'SELECT * FROM detail_pegawai';
            connection.query(query, function(err, result) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Fetch data successfully',
                    data: result
                })
            })

            connection.release();
        })
    },
    getSpecificEmployee(req, res) {
        const id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'SELECT * FROM detail_pegawai WHERE id_pegawai = ?';
            connection.query(query, [id], function(err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Fetch data successfully',
                    data: result
                })
            })

            connection.release();
        })
    },
    updateEmployee(req, res) {
        const id = req.params.id;

        // parse data
        const data = {
            nama: req.body.nama,
            alamat: req.body.alamat,
            no_telepon: req.body.no_telepon,
        }

        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'UPDATE detail_pegawai SET ? WHERE id_pegawai = ? ';
            connection.query(query, [data, id], function(err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Updated successfully',
                })
            })

            connection.release();
        })
    },
    deleteEmployee(req, res) {
        const id = req.params.id;

        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'SELECT * FROM detail_pegawai WHERE id_pegawai = ?';
            connection.query(query, [id], function(err, result) {
                if (err) throw err;

                // check the query
                // if there is no record with that id return this
                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                // delete record from login_pegawai
                const getLoginId = result[0]['id_login'];
                const deleteLoginQuery = 'DELETE FROM login_pegawai WHERE id_login = ?';
                connection.query(deleteLoginQuery, [getLoginId], function(err, result) {
                    if (err) throw err;
                })

                // delete record from detail_pegawai
                const getPegawaiId = result[0]['id_pegawai'];
                const deletePegawaiQuery = 'DELETE FROM detail_pegawai WHERE id_pegawai = ?';
                connection.query(deletePegawaiQuery, [getPegawaiId], function(err, result) {
                    if (err) throw err;
                })

                res.send({
                    success: true,
                    message: 'Deleted successfully',
                })
            })
            connection.release();
        })
    },

    // transaksi section
    getAllTransaction(req, res) {
        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'SELECT * FROM transaksi';
            connection.query(query, function(err, result) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Fetch data successfully',
                    data: result
                })
            })

            connection.release();
        })
    },
    getSpecificTransaction(req, res) {
        const id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'SELECT * FROM transaksi WHERE id_transaksi = ?';
            connection.query(query, [id], function(err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Fetch data successfully',
                    data: result
                })
            })

            connection.release();
        })
    },
    postTransaction(req, res) {
        // parse data from json body
        const {
            id_pegawai,
            id_produk,
            kuantitas,
            total_harga
        } = req.body;

        // generate UID for transaction
        const id_transaksi = generateUID.uuid();

        // get current date
        const currentDate = new Date().toISOString().slice(0, 10);

        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'INSERT INTO transaksi VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(query, [id_transaksi, id_pegawai, id_produk, currentDate, kuantitas, total_harga], function(err, result) {
                if (err) throw err

                res.send({
                    success: true,
                    message: 'Your record has been saved successfully',
                })
            })

            connection.release();
        })

    },
    updateTransaction(req, res) {
        const id = req.params.id;

        // parse data
        const data = {
            id_pegawai: req.body.id_pegawai,
            id_produk: req.body.id_produk,
            tanggal_transaksi: req.body.tanggal_transaksi,
            kuantitas: req.body.kuantitas,
            total_harga: req.body.total_harga,
        }

        pool.getConnection(function(err, connection) {
            if (err) throw err;

            const query = 'UPDATE transaksi SET ? WHERE id_transaksi = ? ';
            connection.query(query, [data, id], function(err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Updated successfully',
                })
            })

            connection.release();
        })
    }

}