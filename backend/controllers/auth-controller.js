const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const activityService = require('../services/activityService');
const Userdto = require('../dtos/user-dtos');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('520555599117-1pfcppsid4cvdpk6qu1gcc22orqjcc64.apps.googleusercontent.com');

class AuthController {
    async sendOtpEmail(req, res) {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: 'email field is required!' });
        }

        const otp = await otpService.generateOtp();

        const ttl = 1000 * 60 * 3; // 3 min
        const expires = Date.now() + ttl;
        const data = `${email}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);

        // send OTP
        try {
            await otpService.sendByEmail(email, otp);
            res.json({
                hash: `${hash}.${expires}`,
                email,
                otp,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'message sending failed' });
        }
    }
    async findUser(req, res) {
        const { username, email } = req.body;
        if (!username && !email) {
            return res.status(400).json({ message: 'Username or email is required' });
        }
    
        try {
            const usernameExists = username ? await userService.findUser({ username }) : false;
            const emailExists = email ? await userService.findUser({ email }) : false;
    
            res.json({ usernameExists: !!usernameExists, emailExists: !!emailExists });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Db error' });
        }
    }
    async verifyOtp(req, res) {
        const { otp, hash, email, password, name } = req.body;
        if (!otp || !hash || !email || !password || !name) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
            return res.status(400).json({ message: 'OTP expired!' });
        }

        const data = `${email}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data);
        if (!isValid) {
            return res.status(400).json({ isValid: false, message: 'Invalid OTP' });
        }

        try {
            // Create a new user with hashed password
            const user = await userService.createUser({ email, password, name });

            const { accessToken, refreshToken } = tokenService.generateTokens({
                _id: user._id,
                activated: false,
            });

            await tokenService.storeRefreshToken(refreshToken, user._id);

            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                domain: 'major-project-backend-fvde.onrender.com', // Frontend domain
                sameSite: 'None'
            });

            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                domain: 'major-project-backend-fvde.onrender.com', // Frontend domain
                sameSite: 'None'
            });

            const userdto = new Userdto(user);
            res.json({ user: userdto, auth: true, isValid: true });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'DB error' });
        }
    }
    async refresh(req, res) {
        // Get refresh token from cookie
        const { refreshToken: refreshTokenFromCookie } = req.cookies;
        if (!refreshTokenFromCookie) {
            return res.status(401).json({ message: 'No token provided' });
        }

        let userData;
        try {
            userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token haa' });
        }

        // Check if the token is in the database
        try {
            const token = await tokenService.findRefreshtoken(userData._id, refreshTokenFromCookie);
            if (!token) {
                return res.status(401).json({ message: 'Invalid token naa' });
            }
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }

        // Check if the user is valid
        const user = await userService.findUser({ _id: userData._id });
        if (!user) {
            return res.status(404).json({ message: 'Invalid user' });
        }

        // Generate new tokens
        const { accessToken, refreshToken } = tokenService.generateTokens({ _id: userData._id });

        // Update refresh token in the database
        try {
            await tokenService.updateRefreshToken(userData._id, refreshToken);
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }

        // Set cookies for the new tokens
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            domain: 'major-project-backend-fvde.onrender.com', // Frontend domain
            sameSite: 'None'
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            domain: 'major-project-backend-fvde.onrender.com', // Frontend domain
            sameSite: 'None'
        });

        const userDto = new Userdto(user);
        res.json({ user: userDto, auth: true });
    }

    // Backend - loginEmail
    async loginEmail(req, res) {
        const { email, password } = req.body;

        try {
            let user = await userService.findUser({ email: email });

            if (!user) {
                return res.status(404).json({ message: 'User does not exist' });
            }

            const isPasswordValid = await userService.findPassword(email, password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Incorrect password' });
            }

            const { accessToken, refreshToken } = tokenService.generateTokens({
                _id: user._id,
            });

            await tokenService.storeRefreshToken(refreshToken, user._id);

            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                domain: 'major-project-backend-fvde.onrender.com', // Frontend domain
                sameSite: 'None'
            });

            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                domain: 'major-project-backend-fvde.onrender.com', // Frontend domain
                sameSite: 'None'
            });

            const userdto = new Userdto(user);
            res.json({ user: userdto, auth: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async findUserInfo(req, res) {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        try {
            console.log(username);
            const user = await userService.findUser({ name: username });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'DB error' });
        }
    }


    async googleLogin(req, res) {
        const { token } = req.body;
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: '520555599117-1pfcppsid4cvdpk6qu1gcc22orqjcc64.apps.googleusercontent.com',
            });
            const payload = ticket.getPayload();
            const { sub, email, name } = payload;

            let user = await userService.findUser({ email });

            if (!user) {
                const randomPassword = hashService.generateRandomPassword(20);
                user = await userService.createUser({ googleId: sub, email, name, password: randomPassword });
                const { accessToken, refreshToken } = tokenService.generateTokens({ _id: user._id });

                await tokenService.storeRefreshToken(refreshToken, user._id);

                res.cookie('refreshToken', refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    domain: 'major-project-backend-fvde.onrender.com', // Frontend domain
                    sameSite: 'None'
                });

                res.cookie('accessToken', accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    domain: 'major-project-backend-fvde.onrender.com', // Frontend domain
                    sameSite: 'None'
                });

                const userDto = new Userdto(user);
                return res.status(201).json({ user: userDto, auth: true, message: 'User created and logged in' });
            } else {
                const { accessToken, refreshToken } = tokenService.generateTokens({ _id: user._id });

                await tokenService.storeRefreshToken(refreshToken, user._id);

                res.cookie('refreshToken', refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    domain: 'major-project-backend-fvde.onrender.com', // Frontend domain
                    sameSite: 'None'
                });

                res.cookie('accessToken', accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    domain: 'major-project-backend-fvde.onrender.com', // Frontend domain
                    sameSite: 'None'
                });

                const userDto = new Userdto(user);
                return res.status(200).json({ user: userDto, auth: true, message: 'User logged in' });
            }
        } catch (error) {
            console.error('Google login failed:', error);
            res.status(401).json({ message: 'Google login failed' });
        }
    }
    // logout 

    async logout(req, res) {
        // delete refresh token from db
        const { refreshToken } = req.cookies;
        await tokenService.removeToken(refreshToken);
        // delete cookies
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({ user: null, auth: false });
    }



    // Controller function to handle profile photo upload
    async updateUserProfilePhoto(req, res) {
        const { email, userClass, school, bio } = req.body; // Extract user's email from request body
    
        // Check if file is uploaded
        if (!req.file) {
            // console.log("no file found")
            // return res.status(400).json({ message: 'No file uploaded.' });
            try{
                const user = await userService.findUser({ email });
                if (!user) {
                    return res.status(404).json({ message: 'User not found.' });
                }
                // console.log("user",user);
                if(school){
                    user.school = school;
                }
                if(userClass){
                    user.class = userClass;
                }
                if(bio){
                    user.bio = bio;
                }
                await user.save();
                return res.status(200).json({ message: 'Profile updated successfully.', user });
            }catch(error){
                console.error('Error updating user profile:', error);
                return res.status(400).json({ message: 'Error updating user profile' });
            }
        }
    
        try {
            // Convert the file buffer to Base64
            const base64Image = req.file.buffer.toString('base64');

            // Find the user by email
            const user = await userService.findUser({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            // Store the Base64-encoded image in the database
            user.img = `data:${req.file.mimetype};base64,${base64Image}`; // Save the Base64 string
            if(school){
                user.school = school;
            }
            if(userClass){
                user.class = userClass;
            }
            if(bio){
                user.bio = bio;
            }
            await user.save();

            console.log(`Profile updated for user: ${user.email}`);
            return res.status(200).json({ message: 'Profile updated successfully.', user });
        } catch (error) {
            console.error('Error updating profile photo:', error);
            res.status(500).json({ message: 'Server error. Please try again later.' });
        }
    }



    async findRecentActivity(req,res){
        const {email} = req.body;
        try{
            const activity = await activityService.findActivity(email);
            res.status(200).json(activity);
        }catch(error){
            console.error('Error finding recent activity:', error);
            res.status(400).json({"request status": "failure", "message":"userActivity not found"});
        }
    }
}

module.exports = new AuthController();
