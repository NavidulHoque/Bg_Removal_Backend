import { User } from "../models/User.js";

export const readAnUser = async (req, res) => {
    
    const {email, provider} = req.body

    try {

        if (!email && !provider) {
            return res.json({
                status: false
            })
        }

        const user = await User.findOne({ email, provider })

        const {_id, username, photo, creditBalance} = user

        return res.json({
            status: true,
            user: {_id, username, email, photo, provider, creditBalance}
        })
    } 
    
    catch (error) {

        console.error(error)

        return res.json({
            status: false,
            message: "Something went wrong, please reload the page"
        })
    }
}

export const updateAnUserCreditBalance = async (req, res) => {

    const {email, provider, creditBalance} = req.body

    try {

        if (!email && !provider) {
            return res.json({
                status: false,
                message: "No credit balance to update, log in first"
            })
        }

        const user = await User.findOneAndUpdate({ email, provider }, {creditBalance: creditBalance - 1}, { new: true })

        return res.json({
            status: true,
            user
        })
    } 
    
    catch (error) {

        console.error(error)

        return res.json({
            status: false
        })
    }
}