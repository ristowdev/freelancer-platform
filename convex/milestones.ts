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

            return {
                ...milestone,
                tasks,
                clientFiles
            };
        }));

        
        return milestonesWithRelations;
 
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
            variant: "fromClient"
        });
    },
  });