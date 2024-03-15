const con = require("../db/mysql");

async function findUserById(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE id = ?'
        con.query(sql, [id], (err, res) => {
            if(err) reject(err)
            resolve(res)
        })
    })
}
async function findUserByUsername(username) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id FROM users WHERE name = ?'
        con.query(sql, [username], (err, res) => {
            if(err) throw err
            resolve(res)
        })
    })
}

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        con.query(sql, [id], (err, res) => {
            if(err) reject(err)
            if(res.length == 0) reject(err)
            resolve(res)
        })
    })
}

module.exports = {deleteUser, findUserById, findUserByUsername}