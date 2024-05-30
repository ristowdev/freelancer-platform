import { v } from "convex/values";
import { action, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import Stripe from "stripe";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
 

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