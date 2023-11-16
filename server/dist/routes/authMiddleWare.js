"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatejwt = void 0;
const jwt = require('jsonwebtoken');
const authenticatejwt = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.headers.id = id;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).send({ success: false, error: err, message: "Authentication failed" });
    }
};
exports.authenticatejwt = authenticatejwt;
