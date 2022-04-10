require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const {
    penjualan
} = require('../controllers');

function authenticateAccessToken(req, res, next) {
    // parse token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[2];

    if (token == null) res.json({
        message: "Invalid access token"
    });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        (err) ? res.json({
            message: err
        }): next();
    });
};

/// CRUD operation for produk table
router.get('/produk', authenticateAccessToken, penjualan.getAllProduct);
router.get('/produk/:id', authenticateAccessToken, penjualan.getSpecificProduct);
router.post('/produk', authenticateAccessToken, penjualan.postNewProduct);
router.patch('/produk/:id', authenticateAccessToken, penjualan.updateProduct);
router.delete('/produk/:id', authenticateAccessToken, penjualan.deleteProduct);

/// Update operation for login_pegawai table
router.patch('/login', authenticateAccessToken, penjualan.updateLoginPegawai);

// Read, update, delete operation for detail_pegawai table
router.get('/pegawai', authenticateAccessToken, penjualan.getAllEmployee);
router.get('/pegawai/:id', authenticateAccessToken, penjualan.getSpecificEmployee);
router.patch('/pegawai/:id', authenticateAccessToken, penjualan.updateEmployee);
// if record in pegawai is deleted, it will delete rellevant record in login_pegawai table also
router.delete('/pegawai/:id', authenticateAccessToken, penjualan.deleteEmployee);

// create, read, and update opertaion for transaksi table
router.get('/transaksi', authenticateAccessToken, penjualan.getAllTransaction);
router.get('/transaksi/:id', authenticateAccessToken, penjualan.getSpecificTransaction);
router.post('/transaksi', authenticateAccessToken, penjualan.postTransaction);
router.patch('/transaksi/:id', authenticateAccessToken, penjualan.updateTransaction);

module.exports = router;