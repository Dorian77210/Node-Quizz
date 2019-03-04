const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //const token = req.headers.authorization.split(' ')[1];
        const token = req.body.token || req.query.token || req.headers['x-access-token'] || window.localStorage.getItem('token');
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        //store the token in the local storage
        //if(!window.localStorage.getItem('token')) {
          //  window.localStorage.setItem('token', token);
        //}
        
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
