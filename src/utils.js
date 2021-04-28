const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const pathToKey = path.join(__dirname, './id_rsa_priv.pem');
const PRIVATE_KEY = fs.readFileSync(pathToKey, 'utf-8');

const genPasswordHash = (password) => {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    }
}

const validPassword = (password, hash, salt) => {
    const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return verifyHash === hash;
}

const issueJWT = (user) => {
    const _id = user._id;

    const expiressIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, { expiresIn: expiressIn, algorithm: 'RS256' });

    return {
        token: "Bearer " + signedToken,
        expires: expiressIn
    }
}

module.exports.validPassword = validPassword;
module.exports.genPasswordHash = genPasswordHash;
module.exports.issueJWT = issueJWT;