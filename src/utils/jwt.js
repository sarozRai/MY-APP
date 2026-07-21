import jwt from 'jsonwebtoken'
import config from '../config/config.js';

const generateJWT = (data) => {
    const token = jwt.sign(data, config.jwtSecret);
    return token;
}

const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwtSecret, (error, data) => {
            if (error) return reject(error);
            return resolve(data)
        })
    })
}

export { generateJWT, verifyJWT }