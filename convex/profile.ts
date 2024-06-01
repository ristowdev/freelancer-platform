import { ConvexError, v } from "convex/values";
import { action, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import Stripe from "stripe";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
 
export const generateUploadUrl = mutation(async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
  
    if (!identity) {
      throw new ConvexError("you must be logged in to upload a file");
    }
  
    return await ctx.storage.generateUploadUrl();
});

export const getDetails = query({
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
 
       const profile = await ctx.db
            .query("profile")
            .withIndex("by_userId", (q) => q.eq("userId", user._id))
            .unique();
        
        if(!profile){
            throw new Error("Couldn't authenticate user");
        }

        const languages = await ctx.db
            .query("languages")
            .withIndex("by_profileId", (q) => q.eq("profileId", profile?._id))
            .order("asc")
            .collect();
 
        return {
            ...profile,
            languages
        }
    },
});


export const updateHoursePerWeek = mutation({
    args: {
        hoursePerWeek: v.union(
            v.literal("More than 30 hrs/week"),
            v.literal("Less than 30 hrs/week"),
            v.literal("As needed - open to offers"),
        ),
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this identity before.
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique(); 

        const profile = await ctx.db
            .query("profile")
            .withIndex("by_userId", (q) =>
                q.eq("userId", user?._id as Id<"users">)
            )
            .unique(); 

        await ctx.db.patch(profile?._id as Id<"profile">, {
            hoursePerWeek: args.hoursePerWeek,
        });
    },
});


export const addLanguage = mutation({
    args: {
        language: v.string(),
        proficiencyLevel: v.union(
            v.literal("Basic"),
            v.literal("Conversational"),
            v.literal("Fluent"),
            v.literal("Native or Bilingual"),
        ),
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this identity before.
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique(); 

        const profile = await ctx.db
            .query("profile")
            .withIndex("by_userId", (q) =>
                q.eq("userId", user?._id as Id<"users">)
            )
            .unique();

        if(!profile){
            throw new Error("Profile not found");
        }

        await ctx.db.insert("languages", {
            profileId: profile?._id as Id<"profile">,
            language: args.language,
            proficiencyLevel: args.proficiencyLevel
        });
    },
});


export const deleteLanguages = mutation({
    args: {
        languages: v.array(v.any()),
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this identity before.
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique(); 

        const profile = await ctx.db
            .query("profile")
            .withIndex("by_userId", (q) =>
                q.eq("userId", user?._id as Id<"users">)
            )
            .unique();

        if(!profile){
            throw new Error("Profile not found");
        }


        const deleteLanguages = args.languages.map(async (language: any) => {
            if(language.profileId === profile._id){
                console.log(language)
                await ctx.db.delete(language._id as Id<"languages">);
            }
        });

        await Promise.all(deleteLanguages);

        
    },
});

export const updateTitle = mutation({
    args: {
        title: v.string(),
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this identity before.
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique(); 

        const profile = await ctx.db
            .query("profile")
            .withIndex("by_userId", (q) =>
                q.eq("userId", user?._id as Id<"users">)
            )
            .unique(); 

        await ctx.db.patch(profile?._id as Id<"profile">, {
            title: args.title,
        });
    },
});


export const updateHourlyRate = mutation({
    args: {
        hourlyRate: v.number(),
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this identity before.
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique(); 

        const profile = await ctx.db
            .query("profile")
            .withIndex("by_userId", (q) =>
                q.eq("userId", user?._id as Id<"users">)
            )
            .unique(); 

        await ctx.db.patch(profile?._id as Id<"profile">, {
            hourlyRate: args.hourlyRate,
        });
    },
});

export const updateProfileOverview = mutation({
    args: {
        description: v.string(),
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this identity before.
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique(); 

        const profile = await ctx.db
            .query("profile")
            .withIndex("by_userId", (q) =>
                q.eq("userId", user?._id as Id<"users">)
            )
            .unique(); 

        await ctx.db.patch(profile?._id as Id<"profile">, {
            description: args.description,
        });
    },
});


export const addProjectInPortfolio = mutation({
    args: {
        projectTitle: v.string(),
        role: v.string(),
        description: v.string(),
        skills: v.array(v.any()),
        temporaryId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this identity before.
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique(); 

        const profile = await ctx.db
            .query("profile")
            .withIndex("by_userId", (q) =>
                q.eq("userId", user?._id as Id<"users">)
            )
            .unique();
        
        if (!profile) {
            throw new Error("Couldn't authenticate user");
        }

        const portfolioProject = await ctx.db.insert("portfolio", {
            projectTitle: args.projectTitle,
            role: args.role,
            description: args.description,
            skills: args.skills, 
            profileId: profile._id
        });
        
        const filesByTemporaryId = await ctx.db.query("portfolioFiles")
            .filter((q)=>q.eq(q.field("temporaryId"), args.temporaryId))
            .collect(); 
    
        const updateMilestoneIdFiles = filesByTemporaryId.map(async (file: any) => {
            await ctx.db.patch(file._id as Id<"portfolioFiles">, {
                portfolioId: portfolioProject as Id<"portfolio">
            });
        });

        await Promise.all(updateMilestoneIdFiles);
 
    },
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
  
        const profile = await ctx.db
            .query("profile")
            .withIndex("by_userId", (q) =>
                q.eq("userId", currentUser?._id as Id<"users">)
            )
            .unique(); 
        
        if (!profile) {
            throw new Error("Couldn't authenticate user");
        }

        await ctx.db.insert("portfolioFiles", {
            name: args.name,
            type: args.type,
            size: args.size,
            fileId: args.fileId,
            temporaryId: args.temporaryId,
            portfolioId: undefined,
            profileId: profile._id 
        });
    },
});