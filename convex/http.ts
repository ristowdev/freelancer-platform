import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { WebhookEvent }  from '@clerk/nextjs/server'
import { Webhook } from "svix"
import { internal } from "./_generated/api";


const validatePayload = async (req: Request): Promise<WebhookEvent | undefined> => {
    const payload = await req.text();
     
    const svixHeader = {
        "svix-id": req.headers.get("svix-id")!,
        "svix-timestamp": req.headers.get("svix-timestamp")!,
        "svix-signature": req.headers.get("svix-signature")!,
    }

    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "")

    try {
        const event = webhook.verify(payload, svixHeader) as WebhookEvent

        return event
    } catch (error) {
        console.log("Clerk colud not be verified.. :/")
    }
}

const handleClerkWebhook = httpAction(async (ctx, req)=>{
    const event = await validatePayload(req)

    if(!event){
        return new Response("Colud not validate clerk payload. ",{
                status: 400
            }
        )
    }

    switch(event.type){
        case "user.created": 
            await ctx.runMutation(internal.users.create, {
                fullName: event.data.first_name+" "+event.data.last_name,
                tokenIdentifier: event.data.id,
                username: event.data.username!,
                profileImageUrl: event.data.image_url
            }) 
            break;

        case "user.updated":
            console.log("user updating")
            break;

        case "user.deleted":
            console.log("user deleted")
            break;

        default: 
            console.log("something went wrong: ", event.type)
    }

    return new Response("", {
        status:200
    })
})

const http = httpRouter()

http.route({
    path: "/clerk-users-webhook",
    method: "POST",
    handler: handleClerkWebhook
})

export default http