const JWT = require('jsonwebtoken');
const { UnauthenticationError } = require('../errors');
const authenticationMiddleware = async (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith('Bearer '))
        throw new UnauthenticationError('No token provided');
    const token = authHeaders.split(' ')[1];
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECERT);
        const { id, username } = decoded; 
        req.user = { id, username };
        console.log(req.user);
        next();
    } catch (error) {
        throw new UnauthenticationError('Not authorized to access this route');
    }

};

module.exports = authenticationMiddleware;