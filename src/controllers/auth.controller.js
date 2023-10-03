const User = require("../models/user");
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

exports.login = async (req, res, next) => {
    const {
        username,
        password
    } = req.body;

    try {
        const user = await User.findOne({
            where: {
                username,
                password
            }
        });

        if (!user) {

            res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        
        let payload = {
            userId: user?.id,
            username: username,
        } 

        const authToken = await jwt.sign(payload, secretKey, { expiresIn: '1h' });

        res.json({
            token: authToken,
            message: 'Login successful'
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}