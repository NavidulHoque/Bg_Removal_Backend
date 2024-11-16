import { Webhook } from 'svix'

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

        const webHook = new Webhook(WEBHOOK_SECRET)

        await webHook.verify(payload, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        })
    }

    catch (error) {

        console.error(error)

        return res.json({
            success: false,
            message: error.message,
        })
    }
}