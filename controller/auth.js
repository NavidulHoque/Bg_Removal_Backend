import { Webhook } from 'svix'
import { User } from './../models/User.js';
import { CLERK_WEBHOOK_SECRET } from '../config/config.js';

export const clerkWebHooks = async (req, res) => {

    // Create new Svix instance with secret
    const wh = new Webhook(CLERK_WEBHOOK_SECRET)

    // Get headers and body
    const headers = req.headers
    const payload = req.body

    // Get Svix headers for verification
    const svix_id = headers['svix-id']
    const svix_timestamp = headers['svix-timestamp']
    const svix_signature = headers['svix-signature']

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return void res.status(400).json({
            success: false,
            message: 'Error: Missing svix headers',
        })
    }

    let evt

    try {
        evt = await wh.verify(payload, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        })

        const { data, type } = evt

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