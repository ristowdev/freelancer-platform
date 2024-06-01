import { v } from "convex/values";
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const proposalStats = query({
    handler: async (ctx) => {
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

        const proposals = await ctx.db
            .query("proposals")
            .withIndex("by_userId", (q) => q.eq("userId", currentUser._id))
            .order("desc")
            .collect();

        const proposalsWithProjectAndClient = await Promise.all(proposals.map(async (proposal) => {
           
            const project = await ctx.db.query("projects")
                .filter((q) => q.eq(q.field("_id"), proposal.projectId))
                .unique();

            const client = await ctx.db.query("users")
                .filter((q) => q.eq(q.field("_id"), proposal.clientId))
                .unique();

            if (!project) {
                throw new Error("Project not found");
            }  

            if(!client){
                throw new Error("Client not found");
            }

            return {
                ...proposal,
                project,
                client,
            };
        }));
 
        return proposalsWithProjectAndClient
    }
});




// import { query } from "./_generated/server";

// const getStartOfWeek = (date: Date): number => {
//     const startOfWeek = new Date(date);
//     startOfWeek.setHours(0, 0, 0, 0);
//     startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
//     return startOfWeek.getTime();
// };

// const getStartOfPreviousWeek = (date: Date): number => {
//     const startOfWeek = getStartOfWeek(date);
//     const startOfPreviousWeek = new Date(startOfWeek);
//     startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - 7);
//     return startOfPreviousWeek.getTime();
// };

// export const proposalStats = query({
//     handler: async (ctx) => {
//         const identity = await ctx.auth.getUserIdentity();

//         if (!identity) {
//             throw new Error("Unauthorized");
//         }

//         // current user
//         const currentUser = await ctx.db
//             .query("users")
//             .withIndex("by_token", (q) => 
//                 q.eq("tokenIdentifier", identity.subject)
//             )
//             .unique();

//         if (!currentUser) {
//             throw new Error("Couldn't authenticate user");
//         }

//         const proposals = await ctx.db
//             .query("proposals")
//             .withIndex("by_userId", (q) => q.eq("userId", currentUser._id))
//             .order("desc")
//             .collect();

//         const proposalsWithProjectAndClient = await Promise.all(proposals.map(async (proposal) => {
//             const project = await ctx.db.query("projects")
//                 .filter((q) => q.eq(q.field("_id"), proposal.projectId))
//                 .unique();

//             const client = await ctx.db.query("users")
//                 .filter((q) => q.eq(q.field("_id"), proposal.clientId))
//                 .unique();

//             if (!project) {
//                 throw new Error("Project not found");
//             }  

//             if (!client) {
//                 throw new Error("Client not found");
//             }

//             return {
//                 ...proposal,
//                 project,
//                 client,
//             };
//         }));
 
//         const now = new Date();
//         const startOfCurrentWeek = getStartOfWeek(now);
//         const startOfPreviousWeek = getStartOfPreviousWeek(now);

//         // Filter proposals based on _creationTime
//         const currentWeekProposals = proposalsWithProjectAndClient.filter(proposal => proposal._creationTime >= startOfCurrentWeek);
//         const lastWeekProposals = proposalsWithProjectAndClient.filter(proposal => proposal._creationTime >= startOfPreviousWeek && proposal._creationTime < startOfCurrentWeek);

//         return {
//             currentWeek: currentWeekProposals,
//             lastWeek: lastWeekProposals,
//         };
//     }
// });