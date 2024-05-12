import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

export const send = mutation({
    args: { 
        text: v.optional(v.string()), 
        userId: v.id("users"), 
        imageUrl: v.optional(v.string()), 
        seen: v.boolean(), 
        conversationId: v.id("conversations"),
        type: v.union(
            v.literal("onlyMessage"),
            v.literal("onlyFiles"),
            v.literal("messageWithFiles"),
        ),
        temporaryId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { text, userId, imageUrl, seen, conversationId, type, temporaryId } = args;
        // const message = text as string;
        // const fromUserId = userId;
        
        const messageId = await ctx.db.insert("messages", {
            text: text,
            userId,
            imageUrl,
            seen,
            isNew:true,
            lastMessageUserId: userId,
            read:false,
            playSound: true,
            conversationId,
            type: type
        });


        await ctx.scheduler.runAfter(5000, internal.messages.updateIsNewMessage, {
            messageId: messageId,
        });

        if((type === "onlyFiles" || type === "messageWithFiles") && temporaryId){
            const filesByTemporaryId = await ctx.db.query("files")
                .withIndex("by_temporaryId", (q) =>
                    q.eq("temporaryId", temporaryId)
                )
                .collect(); 
      
            const updateMessageIdFiles = filesByTemporaryId.map(async (file: any) => {
                await ctx.db.patch(file._id as Id<"files">, {
                    messageId: messageId as Id<"messages">
                });
            });

            await Promise.all(updateMessageIdFiles);
        }

        // const conversation = await ctx.db
        //     .query("conversations")
        //     .filter((q) => q.eq(q.field("_id"), conversationId as Id<"conversations">))
        //     .unique();
        
        // if (!conversation) {
        //     throw new Error("Conversation not found");
        // }

        // const _toUserId = conversation.participantOneId === fromUserId ? conversation.participantTwoId : conversation.participantOneId;

        // const inboxNotification = await ctx.db
        //     .query("inboxNotifications")
        //     .filter((q) => 
        //         q.and(
        //             q.eq(q.field("conversationId"), conversationId as Id<"conversations">),
        //             q.eq(q.field("toUserId"), _toUserId as Id<"users">),
        //             q.eq(q.field("fromUserId"), fromUserId as Id<"users">),
        //         )
        //     )
        //     .unique(); 

        // if (inboxNotification) { 
        //     // Update existing notification
        //     await ctx.db.patch(inboxNotification._id as Id<"inboxNotifications">, {
        //         message,
        //         read: false,
        //         isNew: true,
        //     });

        //     await ctx.scheduler.runAfter(5000, internal.messages.updateIsNewInboxNotification, {
        //         inboxnNotificationId: inboxNotification._id,
        //     });
        // } else {
        //     // Insert new notification
        //     const _inboxnNotificationId = await ctx.db.insert("inboxNotifications", {
        //         toUserId: _toUserId as Id<"users">,
        //         fromUserId: fromUserId as Id<"users">,
        //         message,
        //         read: false,
        //         isNew: true,
        //         conversationId: conversationId,
        //     });

        //     await ctx.scheduler.runAfter(5000, internal.messages.updateIsNewInboxNotification, {
        //         inboxnNotificationId: _inboxnNotificationId,
        //     });
        // }  
    },
});

export const updateIsNewMessage = internalMutation({
    args: { messageId: v.id("messages") },
    handler: async (ctx, args) => {
      await ctx.db.patch(args.messageId, { isNew: false });
    },
});

export const get = query({
    handler: async (ctx) => {
        return await ctx.db
            .query("messages")
            .collect();
    },
});

export const getLast = query({
    args: { conversationId: v.id("conversations") },
    handler: async (ctx, args) => {
        const message = await ctx.db
            .query("messages")
            .withIndex("by_conversationId", (q) => q.eq("conversationId", args.conversationId))
            .first();
        return message;
    },
});


export const readAllMessages = mutation({
    args: { 
        conversationId: v.id("conversations"),
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

        if (user === null)  {
            return;
        }   

        console.log("wofwpke powke poek opfwk opwek powe kpowek fwpoek fpwe  \n\n\n\n\n\\nn")
        console.log("wofwpke powke poek opfwk opwek powe kpowek fwpoek fpwe  \n\n\n\n\n\\nn")
        console.log("wofwpke powke poek opfwk opwek powe kpowek fwpoek fpwe  \n\n\n\n\n\\nn")
        console.log("wofwpke powke poek opfwk opwek powe kpowek fwpoek fpwe  \n\n\n\n\n\\nn")
        console.log("wofwpke powke poek opfwk opwek powe kpowek fwpoek fpwe  \n\n\n\n\n\\nn")
        console.log("wofwpke powke poek opfwk opwek powe kpowek fwpoek fpwe  \n\n\n\n\n\\nn")
        console.log(args.conversationId)
        console.log("wofwpke powke poek opfwk opwek powe kpowek fwpoek fpwe  \n\n\n\n\n\\nn")

        //const userId = identity.subject as Id<"users">;
        const userId = user._id;

        const messages = await ctx.db.query("messages")
            .withIndex("by_conversationId", (q) =>
                q.eq("conversationId", args.conversationId as Id<"conversations">)
            )
            .collect();

            console.log("wofwpke powke poek opfwk opwek powe kpowek fwpoek fpwe  \n\n\n\n\n\\nn")
            console.log("wofwpke powke poek opfwk opwek powe kpowek fwpoek fpwe  \n\n\n\n\n\\nn")
            console.log("wofwpke powke poek opfwk opwek powe kpowek fwpoek fpwe  \n\n\n\n\n\\nn")
            console.log("wofwpke powke poek opfwk opwek powe kpowek fwpoek fpwe  \n\n\n\n\n\\nn")
            console.log("wofwpke powke poek opfwk opwek powe kpowek fwpoek fpwe  \n\n\n\n\n\\nn")
            console.log("wofwpke powke poek opfwk opwek powe kpowek fwpoek fpwe  \n\n\n\n\n\\nn")
            console.log(messages)
            console.log("wofwpke powke poek opfwk opwek powe kpowek fwpoek fpwe  \n\n\n\n\n\\nn")
      
        const allMessages = messages.map(async (message: any) => {
            await ctx.db.patch(message._id as Id<"messages">, {
                read: true
            });
        });

        const readAllMessages = await Promise.all(allMessages);
        
        return true;

    },
});

export const markReadUnRead = mutation({
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

        const messages = await ctx.db.query("messages")
            .withIndex("by_conversationId", (q) =>
                q.eq("conversationId", args.conversationId as Id<"conversations">)
            )
            .collect();

        const lastMessage = await ctx.db.query("messages")
            .withIndex("by_conversationId", (q) =>
                q.eq("conversationId", args.conversationId as Id<"conversations">)
            )
            .order("desc")
            .first()

        if(args.type === "read"){
            if(messages.length > 1){
                const allMessages = messages.map(async (message: any) => {
                    await ctx.db.patch(message._id as Id<"messages">, {
                        read: true
                    });
                });
                await Promise.all(allMessages);
            }else{
                if(lastMessage?.lastMessageUserId !== user._id){
                    await ctx.db.patch(lastMessage?._id as Id<"messages">, {
                        read: true,
                    }); 
                }
            }
        }else{
            if(lastMessage?.lastMessageUserId !== user._id){
                await ctx.db.patch(lastMessage?._id as Id<"messages">, {
                    read: false,
                }); 
            }
        }
 
        return true;
    },
});