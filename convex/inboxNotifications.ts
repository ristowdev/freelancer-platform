import { v } from "convex/values";

import { internalMutation, mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

// internal mutations - https://github.com/get-convex/convex-stripe-demo/blob/main/convex/payments.ts

export const get = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique();

        if (!user) {
            throw new Error("Couldn't authenticate user");
        }
 
       const inboxNotifications = await ctx.db
            .query("inboxNotifications")
            .withIndex("by_toUserId", (q) => q.eq("toUserId", user._id))
            .order("desc")
            .collect();
         
        const inboxNotificationsWithSenderDetails = await Promise.all(inboxNotifications.map(async (notification) => {
           
            const sender = await ctx.db.query("users")
                .filter((q) => q.eq(q.field("_id"), notification.fromUserId))
                .unique();

            if (!sender) {
                throw new Error("Sender not found");
            }  

            return {
                ...notification,
                sender,
            };
        }));

        return inboxNotificationsWithSenderDetails
    },
});

export const markReadUnRead = mutation({
    args: { 
        id: v.id("inboxNotifications"),
        type: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (user === null) {
            return;
        }

        //const userId = identity.subject as Id<"users">;
        const userId = user._id;
        const getNotification = await ctx.db
            .query("inboxNotifications")
            .filter((q) => q.eq(q.field("_id"), args.id as Id<"inboxNotifications">))
            .unique();

        if(!(getNotification?.toUserId === userId)){
            throw new Error("Unauthorized");
        }

        const updateReadStatusNotification = await ctx.db.patch(args.id, {
            read: args.type === "read" ? true : false,
        }); 
 

        return updateReadStatusNotification;
    },
});