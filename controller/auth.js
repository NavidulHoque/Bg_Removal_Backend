import { User } from './../models/User.js'
import jwt from 'jsonwebtoken'

export const createAnUserByCredentials = async (req, res) => {
    const { username, email, password, provider, photo } = req.body

    try {

        let user = await User.findOne({ email });

        if (provider === "credentials") {

            if (user) {
                return res.json({
                    status: false,
                    message: "Email already exists"
                })
            }

            const newUser = new User({ username, email, password, provider })

            await newUser.save()

            return res.json({
                status: true,
                message: "Account created successfully"
            })
        }

        else {

            if (!user) {

                user = new User({ username, email, provider, photo })

                await user.save()

                res.json({
                    status: false,
                    user
                })
            }

            else{
                res.json({
                    status: false,
                    user
                })
            }
        }

    }

    catch (error) {

        console.error(error)

        return res.json({
            status: false,
            message: "Something went wrong, please try again"
        })
    }
}

export const loginAnUser = async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.json({
                status: false,
                message: "Email invalid, create an account first"
            })
        }

        const isMatched = await user.comparePassword(password, user.password)

        if (!isMatched) {
            return res.json({
                status: false,
                message: "Password invalid"
            })
        }

        const { username, _id, createdAt, updatedAt } = user
        const loggedInUser = { id: _id, email: user.email, username, createdAt, updatedAt }

        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "3d" })

        return res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "development" ? "Strict" : "None",
            maxAge: 3 * 24 * 60 * 60 * 1000
        }).json({
            status: true,
            loggedInUser
        })

    }

    catch (error) {
        console.error(error)

        return res.json({
            status: false,
            message: "Something went wrong, please try again"
        })
    }
}

export const logoutAnUser = async (req, res) => {

    try {
        return res.clearCookie("token", { sameSite: "none", secure: true }).json({ status: true })
    }

    catch (error) {
        console.error(error)

        return res.json({
            status: false,
            message: "Something went wrong, please try again"
        })
    }
}

export const createAnUserByProviders = async (req, res) => {

    const { email, username, photo, provider } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });

        // If user doesn't exist, create a new user
        if (!user) {
            user = new User({
                email,
                username,
                photo,
                provider,
            });
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const protect = async (req, res, next) => {

    const token = req.cookies.token

    if (!token) {
        return res.json({
            status: false,
            message: "No token provided, please login"
        })
    }

    jwt.verify(token, process.env.SECRET, async (err) => {

        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.json({
                    status: false,
                    message: "Token expired, please login again"
                })
            }

            return res.json({
                status: false,
                message: "Invalid token, please login again"
            })
        }

        next()
    })
}

