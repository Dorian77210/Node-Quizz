const jwt = require('jsonwebtoken');

const session = require('express-session');
module.exports = (req, res, next) => {
    try {
        console.log(req.session);        
        //const token = req.headers.authorization.split(' ')[1];
        const token = req.body.token || req.query.token || req.session.token;
        
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        
        next();

    } catch(error) {
        return res.status(401).json({
            title: 'Auth failed during checking',
            message: 'Auth failed during checking'
        });
    }
};
