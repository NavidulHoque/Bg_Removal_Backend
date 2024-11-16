import { Webhook } from 'svix'
import { User } from './../models/User.js';
import { CLERK_WEBHOOK_SECRET } from '../config/config.js';

export const clerkWebHooks = async (req, res) => {

    try {
        const headers = req.headers
        const payload = req.body

        // Get the Svix headers for verification
        const svix_id = headers['svix-id']
        const svix_timestamp = headers['svix-timestamp']
        const svix_signature = headers['svix-signature']

        if (!svix_id || !svix_timestamp || !svix_signature) {

            return res.json({
                status: false,
                message: "Error occured -- no svix headers"
            })
        }

        const webHook = new Webhook(CLERK_WEBHOOK_SECRET)

        await webHook.verify(JSON.stringify(payload), {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        })

        const { data, type } = payload

        console.log(type)

        switch (type) {

            case "user.created": {

                const newUser = {
                    clerkID: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.lastName,
                    photo: data.image_url
                }

                await User.create(newUser)

                return res.json({})
            }

            case "user.updated": {

                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.lastName,
                    photo: data.image_url,
                }

                await User.findOneAndUpdate({ clerkID: data.id }, userData)

                return res.json({})
            }

            case "user.deleted": {

                await User.findOneAndDelete({ clerkID: data.id })

                return res.json({})
            }
        }
    }

    catch (error) {

        console.error(error)

        return res.json({
            success: false,
            message: error.message,
        })
    }
}