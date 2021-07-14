const bcrypt = require('bcrypt');

const config = require('../config/index.js');
const User = require('../Models/userModel.js');

const saltRounds = parseInt(config.salt_rounds);

exports.login = async (req, res, next) => {
    const [username, password] = parseAuthHeader(req);

    // Check if username & password was provided
    if (!username || !password) {
        return res.status(401).json({
            status: 'fail',
            message: 'Please provide username and password.'
        });
    }

    const user = await User.findOne({username: username});
    if (!user) {
        return res.status(401).json({
            status: "fail",
            message: "The username or password is incorrect."
        })
    }
    const userDbPassword = user.password;

    let match = false;
    try {
        match = await bcrypt.compare(password, userDbPassword);
    } catch (err) {
        console.log(err);
    }
    
    if (match) {
        return res.status(200).json({
            status: "success",
            message: "Sucessfull login",
            data: {
                username: username
            }
        });
    } else {
        return res.status(401).json({
            status: "fail",
            message: "The username or password is incorrect."
        });
    }
}


exports.signup = async (req, res, next) => {
    const [username, password] = parseAuthHeader(req);

    // Check if username & password was provided
    if (!username || !password) {
        return res.status(401).json({
            status: 'fail',
            message: 'Please provide username and password.'
        });
    }

    // Check if database already contains the submitted username
    try { 
        let userFound = await User.findOne({username: username});
        if (userFound) {
            return  res.status(401).json({
                status: "fail",
                message: "The username " + username + " already exists. Try a different username."
            });
        }
    } catch (ex) {
        console.log(ex);
    }
    
    // Hash the given password and store username & password in DB
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({
            username: username,
            password: hashedPassword
        })
    } catch(ex) {
        console.log(err);
    }

    return res.status(200).json({
        status: "success",
        message: "Account has been successfully created.",
        data: {
            username: username        
        }
    });
}


// This helper function takes in request object as parameter and parses the auth-header 
// to obtain username & password. It returns the parsed username and password as an array.
const parseAuthHeader = (req) => {
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    return [username, password] = credentials.split(':');
}