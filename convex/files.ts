import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
  
    if (!identity) {
      throw new ConvexError("you must be logged in to upload a file");
    }
  
    return await ctx.storage.generateUploadUrl();
});

export const createFile = mutation({
    args: {
      name: v.string(),
      type: v.string(),
      fileId: v.id("_storage"), 
      temporaryId: v.string(),
      size: v.string(),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        // current user
        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => 
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique();

        if (!currentUser) {
            throw new Error("Couldn't authenticate user");
        }
  
        await ctx.db.insert("files", {
            name: args.name,
            type: args.type,
            size: args.size,
            fileId: args.fileId,
            temporaryId: args.temporaryId,
            messageId: undefined,
            userId: currentUser._id

        });
    },
});
  