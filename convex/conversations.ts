import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";
import { getCurrentUser } from "./users";

export const getByUser = query({
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

        const conversations = await ctx.db
            .query("conversations")
            .filter((q) =>
                q.or(
                    q.eq(q.field("participantOneId"), currentUser._id),
                    q.eq(q.field("participantTwoId"), currentUser._id)
                )
            )
            .collect();

        const conversationsWithMessages = await Promise.all(conversations.map(async (conversation) => {
        
            const message = await ctx.db.query("messages")
                .filter((q) => q.eq(q.field("conversationId"), conversation._id))
                .order("desc")
                .take(1);

            const files = await ctx.db.query("files")
                .withIndex("by_messageId", (q) => q.eq("messageId", message[0]._id as Id<"messages">))
                .collect();

            const sender = await ctx.db.query("users")
                .filter((q) => q.eq(q.field("_id"), conversation.participantTwoId))
                .unique();
            
            const unReadMessages = await ctx.db.query("messages")
                .filter((q) => q.and(
                    q.eq(q.field("conversationId"), conversation._id), 
                    q.eq(q.field("read"), false),
                    q.neq(q.field("lastMessageUserId"), currentUser._id),
                ))
                .order("desc")
                .collect();

            return {
                ...conversation,
                message,
                sender,
                unReadMessages: unReadMessages.length,
                files
            };
        }));

        return conversationsWithMessages;
    }
});



export const getConversation = query({
    args: { username: v.string() },
    handler: async (ctx, args) => {
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

        // other user
        const otherUser = await ctx.db
            .query("users")
            .withIndex("by_username", (q) => q.eq("username", args.username))
            .unique();

        const conversation = await ctx.db
            .query("conversations")
            .filter((q) =>
                q.or(
                    q.and(
                        q.eq(q.field("participantOneId"), currentUser._id),
                        q.eq(q.field("participantTwoId"), otherUser?._id)
                    ),
                    q.and(
                        q.eq(q.field("participantOneId"), otherUser?._id),
                        q.eq(q.field("participantTwoId"), currentUser._id)
                    )
                )
            )
            .unique(); 

        const messages = await ctx.db
            .query("messages")
            .filter((q) => q.eq(q.field("conversationId"), conversation?._id))
            .collect();

        const messagesWithUsersRelation = messages.map(async (message: any) => {
            let files: any = [];
            let messageReply: any | null = null;

            const user = await ctx.db.query("users")
                .filter((q: any) => q.eq(q.field("_id"), message.userId))
                .unique();

            const _reactions = await ctx.db.query("messageReactions")
                .filter((q: any) => q.eq(q.field("messageId"), message._id))
                .collect();

            if(message.replayToMessageId){
                messageReply = await ctx.db.query("messages")
                    .filter((q: any) => q.eq(q.field("_id"), message.replayToMessageId as Id<"messages">))
                    .unique();

                const replyToUser = await ctx.db.query("users")
                    .filter((q: any) => q.eq(q.field("_id"), messageReply.userId))
                    .unique();
                
                const _files = await ctx.db.query("files")
                    .withIndex("by_messageId", (q) => q.eq("messageId", messageReply._id))
                    .collect();

                
                const filesWithStorageRelation = _files.map(async (file: any) => {
                    const url = await ctx.storage.getUrl(file.fileId as Id<"_storage">);
                    return {
                        ...file,
                        url
                    }
                });

                files = await Promise.all(filesWithStorageRelation);

                 
                
                messageReply.toUser = replyToUser;
                messageReply.files = files;

                // messageReply.push({user: messageReplyUser});
            }
            
            const reactionsWithUserRelationPromise = _reactions.map(async (reaction: any) => { 
                const user = await ctx.db.query("users")
                    .filter((q: any) => q.eq(q.field("_id"), reaction.userId))
                    .unique();
                return {
                    ...reaction,
                    user
                }
            })

            const reactions = await Promise.all(reactionsWithUserRelationPromise);


            if(message.type === "onlyFiles" || "messageWithFiles"){
                const filesByMessageId = await ctx.db.query("files")
                    .withIndex("by_messageId", (q) => q.eq("messageId", message._id))
                    .collect();
                
                const filesWithStorageRelation = filesByMessageId.map(async (file: any) => {
                    const url = await ctx.storage.getUrl(file.fileId as Id<"_storage">);
                    return {
                        ...file,
                        url
                    }
                });

                files = await Promise.all(filesWithStorageRelation);
            }

            return {
                ...message,
                user,
                files,
                reactions,
                messageReply
            }
        });

        const messagesWithUsersAndFiles = await Promise.all(messagesWithUsersRelation);

        const unReadMessages = await ctx.db.query("messages")
                .filter((q) => q.and(
                    q.eq(q.field("conversationId"), conversation?._id), 
                    q.eq(q.field("read"), false),
                    q.neq(q.field("lastMessageUserId"), currentUser._id),
                ))
                .order("desc")
                .collect();
        
        const proposal = await ctx.db.query("proposals")
            .filter((q) => q.and(
                q.eq(q.field("_id"), conversation?.proposalId), 
            ))
            .unique();
        
        const project = await ctx.db.query("projects")
            .filter((q) => q.and(
                q.eq(q.field("_id"), proposal?.projectId), 
            ))
            .unique();

        return {
            currentUser,
            otherUser,
            conversation,
            messagesWithUsersAndFiles,
            unReadMessages: unReadMessages.length,
            proposal: {
                ...proposal,
                project
            }
        };
    }
});

export const getOrCreateConversation = mutation({
    args: { otherUsername: v.string() },
    handler: async (ctx, args) => {
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
 
        // other user
        const otherUser = await ctx.db
            .query("users")
            .withIndex("by_username", (q) => q.eq("username", args.otherUsername))
            .unique();

        if (!otherUser) {
            throw new Error("User not found");
        }

        let conversation = await ctx.db
            .query("conversations")
            .filter((q) =>
                q.or(
                    q.and(
                        q.eq(q.field("participantOneId"), currentUser._id),
                        q.eq(q.field("participantTwoId"), otherUser._id)
                    ),
                    q.and(
                        q.eq(q.field("participantOneId"), otherUser._id),
                        q.eq(q.field("participantTwoId"), currentUser._id)
                    )
                )
            )
            .unique();

        if (!conversation) {
            const conversationId = await ctx.db.insert("conversations", {
                participantOneId: currentUser._id,
                participantTwoId: otherUser._id,
            });

            conversation = await ctx.db.get(conversationId);
        }

        const messages = await ctx.db
            .query("messages")
            .filter((q) => q.eq(q.field("conversationId"), conversation?._id))
            .collect();

        const messagesWithUsersRelation = messages.map(async (message: any) => {
            const user = await ctx.db.query("users")
                .filter((q: any) => q.eq(q.field("_id"), message.userId))
                .unique();
            return {
                ...message,
                user
            }
        });

        const messagesWithUsers = await Promise.all(messagesWithUsersRelation);

        return {
            currentUser,
            otherUser,
            conversation,
            messagesWithUsers
        };
    }
});



export const getConversations = query({
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
 
       const conversations = await ctx.db
            .query("conversations")
            .filter((q) =>
                q.or(
                    q.and(
                        q.eq(q.field("participantOneId"), user._id),
                    ),
                    q.and(
                        q.eq(q.field("participantTwoId"), user._id)
                    )
                )
            )
            .order("desc")
            .collect();
 
         
        const conversationsWithMessages = await Promise.all(conversations.map(async (conversation) => {
           

            const message = await ctx.db.query("messages")
                .filter((q) => q.eq(q.field("conversationId"), conversation._id))
                .order("desc")
                .take(1); 

            const files = await ctx.db.query("files")
                    .withIndex("by_messageId", (q) => q.eq("messageId", message[0]._id as Id<"messages">))
                    .collect();

            const sender = await ctx.db.query("users")
                .filter((q) => q.eq(q.field("_id"), conversation.participantTwoId))
                .unique();
            
            const unReadMessages = await ctx.db.query("messages")
                .filter((q) => q.and(
                    q.eq(q.field("conversationId"), conversation._id), 
                    q.eq(q.field("read"), false),
                    q.neq(q.field("lastMessageUserId"), user._id),
                ))
                .order("desc")
                .collect();
            return {
                ...conversation,
                message,
                sender,
                unReadMessages: unReadMessages.length,
                files
            };
        }));

        return conversationsWithMessages
    },
});



export const addToFavorite = mutation({
    args: { 
        conversationId: v.id("conversations"),
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

        if(args.type === "add"){
            await ctx.db.insert("favoriteConversations", {
                userId: user._id,
                conversationId: args.conversationId
            });
        }else{ 
            const favoriteConversation = await ctx.db.query("favoriteConversations")
                .filter((q) => q.and(
                    q.eq(q.field("conversationId"), args.conversationId),
                    q.eq(q.field("userId"), user._id)
                ))
                .unique();

            if(!favoriteConversation){
                return;
            }

            await ctx.db.delete(favoriteConversation?._id);
        }
 

        return true;
    },
});


export const getFavoriteConversation = query({
    args: { 
        conversationId: v.string()
     },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        
        if (!identity) {
            throw new Error("Unauthorized");
        }

        // // current user
        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique();
         
        if (!currentUser) {
            throw new Error("Couldn't authenticate user");
        }

        const favoriteConversation = await ctx.db.query("favoriteConversations")
            .filter((q) => q.and(
                q.eq(q.field("conversationId"), args.conversationId),
                q.eq(q.field("userId"), currentUser._id)
            ))
            .unique();
  
        return favoriteConversation;
    }
});

export const getAllInFavoriteConv = query({
    args: {

    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        
        if (!identity) {
            throw new Error("Unauthorized");
        }

        // // current user
        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique();
         
        if (!currentUser) {
            throw new Error("Couldn't authenticate user");
        }

        const favoriteConversations = await ctx.db.query("favoriteConversations")
            .filter((q) => q.eq(q.field("userId"), currentUser._id))
            .collect();
  
        return favoriteConversations;
    }
});

export const getConversationsBelongsTo = query({
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

        const conversationsBelongsTo = await ctx.db
            .query("conversationBelongsTo")
            .filter((q) => q.eq(q.field("userId"), currentUser._id),
            )
            .collect();
 

        return conversationsBelongsTo;
    }
});

export const getSingleConvBelongsTo = query({
    args:{
        conversationId: v.string()
    },
    handler: async (ctx, args) => {
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

        const conversationBelongsTo = await ctx.db
            .query("conversationBelongsTo")
                .filter((q) => q.and(
                    q.eq(q.field("userId"), currentUser._id),
                    q.eq(q.field("conversationId"), args.conversationId)
                ),
            )
            .unique();
 

        return conversationBelongsTo;
    }
});

export const moveBelongsTo = mutation({
    args: { 
        conversationId: v.id("conversations"),
        belongsTo: v.union(
            v.literal("allMessages"),
            v.literal("archived"),
            v.literal("spam"),
        ),
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

        const getConvBelongsTo = await ctx.db
            .query("conversationBelongsTo")
                .filter((q) => q.and(
                    q.eq(q.field("userId"), user._id),
                    q.eq(q.field("conversationId"), args.conversationId)
                ),
            )
            .unique();

        if(!getConvBelongsTo){
            return ;
        }

        await ctx.db.patch(getConvBelongsTo._id, {
            belongsTo: args.belongsTo,
        }); 

        return true;
    },
});