const UserModel = require('../Models/user');

exports.register = async (req, res) => {
    try {
        //get data from frontend
        const { name, email, photoUrl } = req.body;

        //check use already exist
        const userExist = await UserModel.findOne({ email: email });


        // Old User
        if (userExist) {
            return res.status(200).json({
                message: "Welcome Back",
                user: userExist
            });
        }

        // Create New User
        const newUser = await UserModel.create({
            name,
            email,
            photoUrl
        });

        // Send response for new user
        return res.status(201).json({
            message: "User Registered Successfully",
            user: newUser
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            error: 'Server Error',
            message: err.message
        });

    }
};