import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllWorks = query({
    async handler(ctx) {
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

        const works = await ctx.db
            .query("works")
            .withIndex("by_userId", (q) => 
                q.eq("userId", currentUser._id)
            )
            .collect();

        const worksWithRelations = await Promise.all(works.map(async (work) => {

            const project = await ctx.db.query("projects")
                .filter((q) => q.eq(q.field("_id"), work.projectId))
                .unique();

            const proposal = await ctx.db.query("proposals")
                .filter((q) => q.eq(q.field("_id"), work.proposalId))
                .unique();

            const client = await ctx.db.query("users")
                .filter((q) => q.eq(q.field("_id"), work.clientId))
                .unique();

            return {
                ...work,
                project,
                proposal,
                client
            };
        }));

        
        return worksWithRelations;
 
    },
});