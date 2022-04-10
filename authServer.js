require('dotenv').config();

const express = require('express');
const http = require('http');
const jwt = require('jsonwebtoken');

// generate UID
const generateUID = require('short-uuid');

// mysql
const mysql = require('mysql');
const config = require('./src/configs/database');
const connection = mysql.createConnection(config);

const app = express();
const server = http.createServer(app);

let refreshTokenDB = [];

app.use(express.json());

// '/login' route will authenticate the user
// and only after successful authentication,
// it will send access and refresh tokens
// Example : http://localhost:4000/login with json body {username, password}
app.post('/login', async(req, res) => {
    try {
        // destructuring object to get username and password from req.body
        const {
            username,
            password
        } = req.body;

        // try to fetch the data
        const query = 'SELECT * FROM login_pegawai WHERE username = ? AND password = ?';
        connection.query(query, [username, password], function(err, result) {
            if (err) throw err;

            // we can get the result by accessing index 0 from result array
            // it will return undefined if the query is not match with the database record
            if (result[0]) {
                // payload for token
                const payload = {
                    username: username
                };

                // create access token and refres htoken
                const accessToken = generateAccessToken(payload);
                const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

                // push the refresh token
                refreshTokenDB.push(refreshToken);

                // if there is no error, we can return access token and refresh token
                res.json({
                    AccessToken: accessToken,
                    RefreshToken: refreshToken,
                    message: "You are successfully logged in"
                })
            } else {
                res.json({
                    message: "Wrong Username or Password"
                })
            }
        });
    } catch (err) {
        res.json({
            message: "Internal server error"
        })
    }
})

// Example : http://localhost:4000/register with json body {username, password, nama, alamat, no_telepon}
app.post('/register', async(req, res) => {
    // destructuring object to get username and password from req.body
    const {
        nama,
        alamat,
        no_telepon,
        username,
        password
    } = req.body;

    // generate UID
    // short UID
    const id_login = generateUID.generate();
    const id_pegawai = generateUID.generate();

    // create login_pegawai records
    const loginQuery = 'INSERT INTO login_pegawai VALUES (?, ?, ?)';
    connection.query(loginQuery, [id_login, username, password], function(err, result) {
        if (err) throw err;

        // create detail_pegawai records
        const detailQuery = 'INSERT INTO detail_pegawai VALUES (?, ?, ?, ?, ?)';
        connection.query(detailQuery, [id_pegawai, id_login, nama, alamat, no_telepon], function(err, result) {
            if (err) throw err;
        })

        // if there is no erro, send this response
        res.json({
            message: "Your information has been successfully saved"
        })
    });
})

// end point for refresh the access token
app.post('/token', (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        res.json({
            message: 'Invalid refresh token'
        });
    }

    if (!refreshTokenDB.includes(token)) {
        res.json({
            message: 'Forbidden'
        });
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) {
            res.json({
                message: 'Some error occured'
            });
        } else {

            const accessToken = generateAccessToken({
                username: payload.username
            })

            res.json({
                AccessToken: accessToken,
                message: 'This is your new access token'
            });
        }
    });
});

// generate access token that will last until 5 minute
function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1m'
    });
}

server.listen(4000, () => console.log("Authentication server is listening on port: 4000"))