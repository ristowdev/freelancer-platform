import { v } from "convex/values";

import { internalMutation, mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

// internal mutations - https://github.com/get-convex/convex-stripe-demo/blob/main/convex/payments.ts

export const create = mutation({
    args: { 
        projectId: v.id("projects"),
        clientId: v.id("users"),
        hourlyRate: v.number(),
        coverLetter: v.string()
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

        const proposalId = await ctx.db.insert("proposals", {
             projectId: args.projectId as Id<"projects">,
             userId: user._id as Id<"users">,
             clientId: args.clientId as Id<"users">,
             hourlyRate: args.hourlyRate,
             coverLetter: args.coverLetter,
             status:'Pending'
        })

        return proposalId;
    },
});


export const get = query({
    args: {
        slug: v.string(), 
    },
    handler: async (ctx, args) => {

        
        let projects = [];

        projects = await ctx.db
            .query("projects")
            .order("desc")
            .collect();

        if (args.slug !== undefined) {
            const slug = args.slug as string;
            // get subcategory by name
            const category = await ctx.db
                .query("categories")
                .withIndex("by_slug", (q) => q.eq("slug", slug))
                .unique();

            const filteredProjects = projects.filter((project) => project.categoryId === category?._id);
            projects = filteredProjects;
        }


        const projectsWithClientDetails = await Promise.all(projects.map(async (project) => {
           
            const seller = await ctx.db.query("users")
                .filter((q) => q.eq(q.field("_id"), project.sellerId))
                .unique();

            if (!seller) {
                throw new Error("Seller not found");
            }  

            return {
                ...project,
                seller,
            };
        }));


        return projectsWithClientDetails;
        // const category = await ctx.db
        //     .query("categories")
        //     .withIndex("by_slug", (q) =>
        //         q.eq("slug", args.slug)
        //     )
        //     .unique(); 


        // if(category){
        // let projects = [];

        //     projects = await ctx.db
        //         .query("projects")
        //         .withIndex("by_categoryId", (q) =>
        //             q.eq("categoryId", category._id)
        //         )
        //         .collect()

        // return projects;
            
        // }


    },
});

export const getProposals = query({
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

        // let proposals = [];

       const proposals = await ctx.db
            .query("proposals")
            .withIndex("by_userId", (q) => q.eq("userId", user._id))
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
    },
});

export const cancelProposal = mutation({
    args: { id: v.id("proposals") },
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
        const cancelProposal = await ctx.db
            .query("proposals")
            .filter((q) => q.eq(q.field("_id"), args.id as Id<"proposals">))
            .unique();

        if(!(cancelProposal?.userId === userId)){
            throw new Error("Unauthorized");
        }

        const cancelProposalFinal = await ctx.db.patch(args.id, {
            status: "Canceled",
        }); 

        return cancelProposalFinal;
    },
});

// client proposals

export const getClientProposals = query({
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

        // let proposals = [];

       const proposals = await ctx.db
            .query("proposals")
            .withIndex("by_clientId", (q) => q.eq("clientId", user._id))
            .order("desc")
            .collect();

        const proposalsWithProjectAndUser = await Promise.all(proposals.map(async (proposal) => {
           
            const project = await ctx.db.query("projects")
                .filter((q) => q.eq(q.field("_id"), proposal.projectId))
                .unique();

            const user = await ctx.db.query("users")
                .filter((q) => q.eq(q.field("_id"), proposal.userId))
                .unique();

            if (!project) {
                throw new Error("Project not found");
            }  

            if(!user){
                throw new Error("Client not found");
            }

            return {
                ...proposal,
                project,
                user,
            };
        }));
 
        return proposalsWithProjectAndUser
    },
});

export const acceptProposalClient = mutation({
    args: { id: v.id("proposals") },
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
        const acceptProposal = await ctx.db
            .query("proposals")
            .filter((q) => q.eq(q.field("_id"), args.id as Id<"proposals">))
            .unique();

        if(!(acceptProposal?.clientId === userId)){
            throw new Error("Unauthorized");
        }

        const proposalOwnerUser = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("_id"), acceptProposal.userId as Id<"users">))
            .unique();

        const acceptProposalFinal = await ctx.db.patch(args.id, {
            status: "Active",
        }); 

        const notificationId = await ctx.db.insert("notifications", {
            userId: acceptProposal.userId as Id<"users">,
            fromUserId: acceptProposal.clientId as Id<"users">,
            title: `${user.fullName} accepted your proposal`,
            message: "Your proposal has been accepted. You can now proceed to message for further information.",
            read: false,
            isNew: true,
            type:"AcceptedProposal"
       })

        await ctx.scheduler.runAfter(5000, internal.proposals.updateIsNewNotification, {
            notificationId: notificationId,
        });

        const conversationId = await ctx.db.insert("conversations", {
            participantOneId: acceptProposal.userId,
            participantTwoId: acceptProposal.clientId,
        });

        const message = `Hello ${proposalOwnerUser?.fullName}. Thank you for your interest in our project. We are eager to discuss the details with you. Please feel free to ask any questions you may have so that we can get started on this project promptly.`;
    
        const sendMessageToConversation = await ctx.db.insert("messages", {
            userId: acceptProposal.clientId,
            text: message,
            seen: false,
            read: false,
            isNew: true,
            conversationId,
            playSound:false,
            lastMessageUserId: acceptProposal.clientId
        });

        await ctx.scheduler.runAfter(5000, internal.proposals.updateIsNewMessage, {
            messageId: sendMessageToConversation,
        });

        await ctx.db.insert("conversationBelongsTo", {
            userId: acceptProposal.userId,
            conversationId,
            belongsTo:"allMessages"
        });

        return acceptProposalFinal;
    },
});
 
export const updateIsNewNotification = internalMutation({
    args: { notificationId: v.id("notifications") },
    handler: async (ctx, args) => {
      await ctx.db.patch(args.notificationId, { isNew: false });
    },
});

export const updateIsNewMessage = internalMutation({
    args: { messageId: v.id("messages") },
    handler: async (ctx, args) => {
      await ctx.db.patch(args.messageId, { isNew: false });
    },
});

export const setPendingProposalClient = mutation({
    args: { id: v.id("proposals") },
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
        const cancelProposal = await ctx.db
            .query("proposals")
            .filter((q) => q.eq(q.field("_id"), args.id as Id<"proposals">))
            .unique();

        if(!(cancelProposal?.clientId === userId)){
            throw new Error("Unauthorized");
        }

        const cancelProposalFinal = await ctx.db.patch(args.id, {
            status: "Pending",
        }); 

        return cancelProposalFinal;
    },
});

export const getDetails = query({
    args: {
        slug: v.string(), 
    },
    handler: async (ctx, args) => {
        const project = await ctx.db
            .query("projects")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();

        const seller = await ctx.db.query("users")
            .filter((q) => q.eq(q.field("_id"), project?.sellerId))
            .unique();

        const projectWithClientDetails = {
            ...project,
            seller
        } 

        return projectWithClientDetails; 
    },
});

export const isPublished = query({
    args: { id: v.id("gigs") },
    handler: async (ctx, args) => {
        const gig = await ctx.db.get(args.id);
        return gig?.published || false;
    }
});

export const publish = mutation({
    args: { id: v.id("gigs") },
    handler: async (ctx, args) => {
        const gig = await ctx.db.get(args.id);
        if (!gig) {
            throw new Error("Gig not found");
        }

        const media = await ctx.db.query("gigMedia")
            .withIndex("by_gigId", (q) => q.eq("gigId", gig._id))
            .collect();

        const offers = await ctx.db.query("offers")
            .withIndex("by_gigId", (q) => q.eq("gigId", gig._id))
            .collect();

        if (media.length === 0 || gig.description === "" || offers.length !== 3) {
            throw new Error("Gig needs at least one image to be published");
        }

        await ctx.db.patch(args.id, {
            published: true,
        });

        return gig;
    },
});

export const unpublish = mutation({
    args: { id: v.id("gigs") },
    handler: async (ctx, args) => {
        const gig = await ctx.db.get(args.id);

        if (!gig) {
            throw new Error("Gig not found");
        }

        await ctx.db.patch(args.id, {
            published: false,
        });

        return gig;
    },
});


export const remove = mutation({
    args: { id: v.id("gigs") },
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
        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_gig", (q) =>
                q
                    .eq("userId", userId)
                    .eq("gigId", args.id)
            )
            .unique();

        if (existingFavorite) {
            await ctx.db.delete(existingFavorite._id);
        }

        await ctx.db.delete(args.id);
    },
});


export const updateDescription = mutation({
    args: { id: v.id("gigs"), description: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const description = args.description.trim();

        if (!description) {
            throw new Error("Description is required");
        }

        if (description.length > 20000) {
            throw new Error("Description is too long!")
        }

        const gig = await ctx.db.patch(args.id, {
            description: args.description,
        });

        return gig;
    },
});

export const update = mutation({
    args: { id: v.id("gigs"), title: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const title = args.title.trim();

        if (!title) {
            throw new Error("Title is required");
        }

        if (title.length > 60) {
            throw new Error("Title cannot be longer than 60 characters")
        }

        const gig = await ctx.db.patch(args.id, {
            title: args.title,
        });

        return gig;
    },
});


export const favorite = mutation({
    args: { id: v.id("gigs") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const gig = await ctx.db.get(args.id);

        if (!gig) {
            throw new Error("Board not found");
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

        const userId = user._id;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_gig", (q) =>
                q
                    .eq("userId", userId)
                    .eq("gigId", gig._id)
            )
            .unique();

        if (existingFavorite) {
            throw new Error("Board already favorited");
        }

        await ctx.db.insert("userFavorites", {
            userId,
            gigId: gig._id,
        });

        return gig;
    },
});


export const unfavorite = mutation({
    args: { id: v.id("gigs") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const gig = await ctx.db.get(args.id);

        if (!gig) {
            throw new Error("Board not found");
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

        const userId = user._id;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_gig", (q) =>
                q
                    .eq("userId", userId)
                    .eq("gigId", gig._id)
            )
            .unique();

        if (!existingFavorite) {
            throw new Error("Favorited gig not found");
        }

        await ctx.db.delete(existingFavorite._id);

        return gig;
    },
});

export const getSeller = query({
    args: { id: v.id("users") },
    handler: async (ctx, args) => {
        const seller = ctx.db.get(args.id);
        return seller;
    },
});


export const getCategoryAndSubcategory = query({
    args: {
        gigId: v.id("gigs"),
    },
    handler: async (ctx, args) => {
        const gig = await ctx.db.get(args.gigId);

        if (!gig) {
            throw new Error("Gig not found");
        }

        const subcategory = await ctx.db.get(gig.subcategoryId);

        if (!subcategory) {
            throw new Error("Subcategory not found");
        }

        const category = await ctx.db.get(subcategory.categoryId);
        if (!category) {
            throw new Error("Category not found");
        }

        return {
            category: category.name,
            subcategory: subcategory.name,
        };
    }
});