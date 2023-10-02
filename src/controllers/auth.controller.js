const User = require("../models/user");

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

        if (user) {
            res.json({
                message: 'Login successful'
            });
        } else {
            res.status(401).json({
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}