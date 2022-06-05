const UserModel = require('../models/User.model');

const SignIn = async (req, res) => {
    try {
        const { username, password, name } = req.body;

        const user = await UserModel.findOne({
            username
        });

        if (!user) {
            const newUser = new UserModel({
                username,
                password,
                name
            });

            await newUser.save();
        }

        return res.status(201).json({
            user: user || newUser
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = SignIn;
