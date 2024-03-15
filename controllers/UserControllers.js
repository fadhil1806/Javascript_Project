const { findUserById, findUserByUsername, deleteUser } = require('.');
const con = require('../db/mysql');
const response = require('../helpers/response');
const { hashPassword } = require('../system/hash');
const validation = require('../system/validation');

const getAllUser = (req, res) => {
    const sql = 'SELECT * FROM users';
    con.query(sql, (err, result) => {
        response(res, 200, result)
    })
}

const getUserById = async(req, res) => {
    const id = req.params.id
    const isValid = await findUserById(id)
    if(isValid.length == 0 ) {
        response(res, 404, {status: false, msg: "not found data"})
    }else {
        response(res, 200, isValid[0])
    }
}

const addDataUser = async(req, res) => {
    const {username, password} = req.body
    const isValidUsername = await validation(username)
    const isValidPassword = await validation(password)

    if(isValidUsername && isValidPassword) {
        const isValid = await findUserByUsername(username)
        if(isValid.length == 1) {
            response(res, 404, {"msg": "not found username"})
        }else {
            con.query('INSERT INTO users(name, password) VALUES (?, ?)', [username, await hashPassword(password)], (err, result) => {
                if(err) throw err;
                response(res, 200, {"status": true})
            })  
        }

    }else if(!isValidUsername && !isValidPassword) {
        response(res, 503, {"msg":"failed to validate the form"})
    }else {
        if(!isValidUsername) response(res, 400, {"msg": "username required"})
        if(!isValidPassword) response(res, 400, {"msg": "password required"})
    }
    
}

const updateUser = async (req, res) => {
    const { username, password } = req.body;
    const isValidUsername = await validation(username);
    const isValidPassword = await validation(password);
    
    if (isValidUsername && isValidPassword) {
        con.query('UPDATE users SET password = ? WHERE name = ?', [await hashPassword(password), username], (err, result) => {
            if (err) response(res, 500, { "message": "Failed to update user data" });
            response(res, 200, {"msg": "update"})
        });

    } else if (!isValidUsername && !isValidPassword) {
        response(res, 400, { "message": "Failed to validate the form" });
    } else {
        if (!isValidUsername) response(res, 400, { "message": "Username required" });
        if (!isValidPassword) response(res, 400, { "message": "Password required" });
    }
};

module.exports = {getAllUser, getUserById, addDataUser, updateUser}