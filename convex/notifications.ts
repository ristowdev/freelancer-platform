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
 
       const notifications = await ctx.db
            .query("notifications")
            .withIndex("by_userId", (q) => q.eq("userId", user._id))
            .order("desc")
            .collect();
 
        return notifications
    },
});

export const markReadUnRead = mutation({
    args: { 
        id: v.id("notifications"),
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
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique();

        if (user === null) {
            return;
        }

        //const userId = identity.subject as Id<"users">;
        const userId = user._id;
        const getNotification = await ctx.db
            .query("notifications")
            .filter((q) => q.eq(q.field("_id"), args.id as Id<"notifications">))
            .unique();

        if(!(getNotification?.userId === userId)){
            throw new Error("Unauthorized");
        }

        const updateReadStatusNotification = await ctx.db.patch(args.id, {
            read: args.type === "read" ? true : false,
        }); 
 

        return updateReadStatusNotification;
    },
});