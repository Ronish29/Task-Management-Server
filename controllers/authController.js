const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
        username: username
    });

    if(existingUser){
        return res.status(409).json({
            success: false,
            error: "Username already exists"
        })
    }

    const existingEmail = await User.findOne({
        email : email
    })

    if(existingEmail){
        return res.status(409).json({
            success: false,
            error: "Email Already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({ username, email, password : hashedPassword });
        await user.save();

        res.status(201).json({ 
            success: true,
            message: 'User registered successfully' 
        });

    } catch (err) {
        res.status(400).json({ 
            error: 'User registration failed' 
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ email });
        console.log("user found", user);

        if (!user) {
            return res.status(400).json({ 
                error: 'User Not Found' 
            });
        }
            
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ 
            success: true,
            message: "User loggged in successfully",
            token,
            username : user.username
        });
        
    } catch (err) {
        res.status(400).json({ 
            error: 'Login failed',
            message: err.message
        });
    }
};
