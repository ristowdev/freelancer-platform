import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const generateUploadUrl = mutation(async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
  
    if (!identity) {
      throw new ConvexError("you must be logged in to upload a file");
    }
  
    return await ctx.storage.generateUploadUrl();
});

export const create = mutation({
    args: {
        workId: v.id("works"), 
        title: v.string(),
        longDescription: v.string(),
        shortDescription: v.string(),
        dueDate: v.number(),
        payment: v.number(),
        tasks: v.array(v.object({
            id: v.string(),
            name: v.string()
        })),
        hasFiles: v.boolean(),
        temporaryId: v.optional(v.string()),
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

        const milestoneId = await ctx.db.insert("milestones", {
            workId: args.workId,  
            title: args.title,
            longDescription: args.longDescription,
            shortDescription: args.shortDescription,
            dueDate: args.dueDate,
            payment: args.payment,
            status: "active"
        });

        if(args.hasFiles === true && args.temporaryId){
            const filesByTemporaryId = await ctx.db.query("milestoneFiles")
                .filter((q)=>q.eq(q.field("temporaryId"), args.temporaryId))
                .collect(); 
      
            const updateMilestoneIdFiles = filesByTemporaryId.map(async (file: any) => {
                await ctx.db.patch(file._id as Id<"milestoneFiles">, {
                    milestoneId: milestoneId as Id<"milestones">
                });
            });

            await Promise.all(updateMilestoneIdFiles);
        }

        await Promise.all(args.tasks.map((task) => {
            return ctx.db.insert("milestoneTasks", {
              milestoneId: milestoneId,
              name: task.name,
              done: false,
            });
        }));

        return true;

    }, 
});

export const get = query({
    args: {
        workId: v.id("works")
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

        const work = await ctx.db
            .query("works")
            .filter((q)=> 
                q.and(q.eq(q.field("_id"), args.workId), q.eq(q.field("userId"), currentUser._id)),
            )
            .unique();

        if(!work){
            throw new Error("Work not found");
        }

        const milestones = await ctx.db
            .query("milestones")
            .withIndex("by_workId", (q) => 
                q.eq("workId", work._id)
            )
            .collect();

        const milestonesWithRelations = await Promise.all(milestones.map(async (milestone) => {
        
            const tasks = await ctx.db.query("milestoneTasks")
                .filter((q) => q.eq(q.field("milestoneId"), milestone._id))
                .collect();

            const _clientFiles = await ctx.db.query("milestoneFiles")
                .filter((q) => q.and(
                    q.eq(q.field("milestoneId"), milestone._id),
                    q.eq(q.field("variant"), "fromClient"),
                ))
                .collect();

            const filesWithStorageRelation = _clientFiles.map(async (file: any) => {
                const url = await ctx.storage.getUrl(file.fileId as Id<"_storage">);
                return {
                    ...file,
                    url
                }
            });

            const clientFiles = await Promise.all(filesWithStorageRelation);

            const _userFiles = await ctx.db.query("milestoneFiles")
                .filter((q) => q.and(
                    q.eq(q.field("milestoneId"), milestone._id),
                    q.eq(q.field("variant"), "fromUser"),
                ))
                .collect();

            const userfilesWithStorageRelation = _userFiles.map(async (file: any) => {
                const url = await ctx.storage.getUrl(file.fileId as Id<"_storage">);
                return {
                    ...file,
                    url
                }
            });

            const userFiles = await Promise.all(userfilesWithStorageRelation);

            const work = await ctx.db
                .query("works")
                .filter((q) => q.eq(q.field("_id"), milestone.workId as Id<"works">))
                .unique();

            const milestoneUser = await ctx.db
                .query("users")
                .filter((q) => q.eq(q.field("_id"), work?.userId as Id<"users">))
                .unique();

            const milestoneClient = await ctx.db
                .query("users")
                .filter((q) => q.eq(q.field("_id"), work?.clientId as Id<"users">))
                .unique();

            return {
                ...milestone,
                tasks,
                clientFiles,
                userFiles,
                members:{
                    user:milestoneUser,
                    client:milestoneClient
                }
            };
        }));

        
        return milestonesWithRelations;
 
    },
});

export const getWorkDetails = query({
    args: {
        workId: v.id("works")
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

        const work = await ctx.db
            .query("works")
            .filter((q)=> 
                q.and(q.eq(q.field("_id"), args.workId), q.eq(q.field("userId"), currentUser._id)),
            )
            .unique();

        if(!work){
            throw new Error("Work not found");
        }

        const project = await ctx.db
            .query("projects")
            .filter((q) => q.eq(q.field("_id"), work?.projectId as Id<"projects">))
            .unique();
        
        const client = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("_id"), work?.clientId as Id<"users">))
            .unique();

        const proposal = await ctx.db
            .query("proposals")
            .filter((q) => q.eq(q.field("_id"), work?.proposalId as Id<"proposals">))
            .unique(); 
        
        return {
            client,
            project,
            proposal
        };
 
    },
});

export const updateTask = mutation({
    args: { 
        taskId: v.id("milestoneTasks"),
        done: v.boolean(),
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
 
        const updateTask = await ctx.db.patch(args.taskId, {
            done: args.done,
        }); 

        return updateTask;
    },
});

export const createFile = mutation({
    args: {
        name: v.string(),
        type: v.string(),
        size: v.optional(v.string()),
        fileId: v.id("_storage"),
        temporaryId: v.string(),
        variant: v.union(
            v.literal("fromClient"),
            v.literal("fromUser"),
        ),
        status: v.optional(v.union(
            v.literal("inReview"),
            v.literal("rejected"),
            v.literal("accepted"),
        ))
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
  
        await ctx.db.insert("milestoneFiles", {
            name: args.name,
            type: args.type,
            size: args.size,
            fileId: args.fileId,
            temporaryId: args.temporaryId,
            variant: args.variant,
            status: args.status
        });
    },
  });



  export const submitForReview = mutation({
    args: {
        workId: v.id("works"), 
        milestoneId: v.id("milestones"), 
        temporaryId: v.optional(v.string()),
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
 
        const filesByTemporaryId = await ctx.db.query("milestoneFiles")
            .filter((q)=>q.eq(q.field("temporaryId"), args.temporaryId))
            .collect(); 
    
        const updateMilestoneIdFiles = filesByTemporaryId.map(async (file: any) => {
            await ctx.db.patch(file._id as Id<"milestoneFiles">, {
                milestoneId: args.milestoneId as Id<"milestones">
            });
        });

        await Promise.all(updateMilestoneIdFiles);

        await ctx.db.patch(args.milestoneId, { status: "inReview" });

        return true;

    },
});

export const addComment = mutation({
    args: {
        milestoneId: v.id("milestones"), 
        userId: v.id("users"), 
        clientId: v.id("users"), 
        comment: v.string(), 
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

        await ctx.db.insert("milestoneComments", {
            milestoneId: args.milestoneId,  
            clientId: args.clientId,
            userId: args.userId,
            comment: args.comment, 
            messageOwnerId: currentUser._id
        });

        return true;

    },
});


export const getComments = query({
    args: {
        milestoneId: v.id("milestones")
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique();

        if (!currentUser) {
            throw new Error("Couldn't authenticate user");
        }

        const comments = await ctx.db.query("milestoneComments")
            .withIndex("by_milestoneId", (q) =>
                q.eq("milestoneId", args.milestoneId)
            )
            .collect();

        const commentsWithRelation = await Promise.all(comments.map(async (comment: any) => {
            const user = await ctx.db
                .query("users")
                .filter((q) => q.eq(q.field("_id"), comment.userId))
                .unique();

            const client = await ctx.db
                .query("users")
                .filter((q) => q.eq(q.field("_id"), comment.clientId))
                .unique();

            const messageOwner = await ctx.db
                .query("users")
                .filter((q) => q.eq(q.field("_id"), comment.messageOwnerId))
                .unique();

            return {
                ...comment,
                user,
                client,
                messageOwner
            };
        }));

        return commentsWithRelation;
    },
});