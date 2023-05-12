const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const headers = req.headers;
        // console.log('Header ==> '+JSON.stringify(req.headers))
        if (headers.hasOwnProperty('authorization')) {
            if (headers.hasOwnProperty('authorization')) {
                const token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decode) => decode !== undefined ? decode : err);
                // console.log('Data ==> '+JSON.stringify(decoded))
                // To check whether the current user is autorized and correct user
                if (decoded instanceof Error) {
                    return res.status(200).json({
                        status: 'failed',
                        message: 'Auth failed'
                    });
                }

                next();
            }

        } else {
            return res.status(401).json({
                status: 'failed',
                message: 'Auth failed'
            });
        }
    } catch (error) {
        console.log('Error at middleware ' + error)
        return res.status(401).json({
            status: 'failed',
            message: 'Auth failed'
        });
    }
}