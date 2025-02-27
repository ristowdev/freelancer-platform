import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";
 
export default defineSchema({
    users: defineTable({
        fullName: v.string(),
        username: v.string(),
        title: v.string(),
        about: v.string(),
        portfolioUrls: v.optional(v.array(v.string())),
        profileImageUrl: v.optional(v.string()),
        favoritedSellerIds: v.optional(v.array(v.string())),
        tokenIdentifier: v.string(), // clerk id
        customTag: v.optional(v.string()),
        stripeAccountId: v.optional(v.string()),
        stripeAccountSetupComplete: v.optional(v.boolean()),
        role:v.optional(
            v.union(
                v.literal("freelancer"),
                v.literal("client"),
                v.literal("admin"),
            )
        )
    }) 
        .index("by_token", ["tokenIdentifier"]) // by clerk id
        .index("by_username", ["username"]),
    reviews: defineTable({
        authorId: v.id("users"),
        sellerId: v.id("users"),
        gigId: v.id("gigs"),
        comment: v.string(),
        communication_level: v.number(),
        recommend_to_a_friend: v.number(),
        service_as_described: v.number(),
    })
        .index("by_sellerId", ["sellerId"])
        .index("by_gigId", ["gigId"]),
    skills: defineTable({
        skill: v.string(),
        userId: v.id("users"),
    })
        .index("by_userId", ["userId"]),
    userFlags: defineTable({
        userId: v.id("users"),
        markingType: v.string(),
        description: v.string(),
    }),
    countries: defineTable({
        countryName: v.string(),
        userId: v.id("users"),
    })
        .index("by_userId", ["userId"]),
    gigs: defineTable({
        title: v.string(),
        description: v.string(),
        sellerId: v.id("users"),
        subcategoryId: v.id("subcategories"),
        published: v.optional(v.boolean()),
        clicks: v.number(),
    })
        .index("by_sellerId", ["sellerId"])
        .index("by_subcategoryId", ["subcategoryId"])
        .index("by_published", ["published"])
        .searchIndex("search_title", {
            searchField: "title",
        }),
    projects: defineTable({
        title: v.string(),
        slug: v.string(),
        experienceLevel: v.string(),
        paymentVerified: v.optional(v.boolean()),
        location: v.string(),
        priceType: v.string(),
        price: v.number(),
        tags: v.array(v.string()),
        descriptionShort: v.string(),
        descriptionLong: v.string(),
        // categorySlug: v.string(),
        categoryId: v.id("categories"),
        sellerId: v.id("users"),
        published: v.optional(v.boolean()),
        clicks: v.number(),
    })
        .index("by_sellerId", ["sellerId"])
        .index("by_categoryId", ["categoryId"])
        .index("by_published", ["published"])
        .index("by_slug", ["slug"])
        .searchIndex("search_title", {
            searchField: "title",
        }),
    proposals: defineTable({
        projectId: v.id("projects"),
        userId: v.id("users"),
        clientId: v.id("users"), 
        hourlyRate: v.number(),
        coverLetter: v.string(),
        status: v.string(),
    })
        .index("by_projectId", ["projectId"])
        .index("by_userId", ["userId"])
        .index("by_clientId", ["clientId"]),
    notifications: defineTable({
        userId: v.id("users"),
        fromUserId: v.id("users"),
        title: v.string(),
        message: v.string(),
        read: v.boolean(),
        isNew: v.boolean(),
        type: v.union(
            v.literal("AcceptedProposal"),
            v.literal("NewPayment"), 
        ), 
    })
        .index("by_userId", ["userId"])
        .index("by_fromUserId", ["fromUserId"]),
    inboxNotifications: defineTable({
        toUserId: v.id("users"),
        fromUserId: v.id("users"),
        message: v.string(),
        read: v.boolean(),
        isNew: v.boolean(),
        conversationId: v.id("conversations"),
    })
        .index("by_toUserId", ["toUserId"])
        .index("by_fromUserId", ["fromUserId"]) 
        .index("by_conversationId", ["conversationId"]),
    offers: defineTable({
        gigId: v.id("gigs"),
        title: v.string(),
        description: v.string(),
        tier: v.union(
            v.literal("Basic"),
            v.literal("Standard"),
            v.literal("Premium")
        ),
        price: v.number(),
        delivery_days: v.number(),
        revisions: v.number(),
        stripePriceId: v.string(),
    })
        .index("by_gigId", ["gigId"])
        .index("by_tier", ["tier"])
        .index("by_gigId_tier", ["gigId", "tier"]),
    orders: defineTable({
        offerId: v.id("offers"),
        gigId: v.id("gigs"),
        buyerId: v.id("users"),
        fulfillmentStatus: v.string(),
        fulfilmentTime: v.optional(v.number()),
    })
        .index("by_buyerId", ["buyerId"])
        .index("by_gigId", ["gigId"]),
    gigMedia: defineTable({
        storageId: v.id("_storage"),
        format: v.string(),
        gigId: v.id("gigs"),
    })
        .index("by_gigId", ["gigId"])
        .index("by_storageId", ["storageId"]),
    categories: defineTable({
        name: v.string(),
        slug: v.string(),
    })
        .index("by_slug", ["slug"])
    ,
    subcategories: defineTable({
        categoryId: v.id("categories"),
        name: v.string(),
    })
        .index("by_category", ["categoryId"])
        .index("by_name", ["name"]),
    faq: defineTable({
        question: v.string(),
        answer: v.string(),
        gigId: v.id("gigs"),
    }),
    messages: defineTable({
        userId: v.id("users"),
        text: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        seen: v.boolean(),
        read: v.optional(v.boolean()),
        isNew: v.optional(v.boolean()),
        playSound: v.optional(v.boolean()),
        lastMessageUserId: v.optional(v.id("users")),
        conversationId: v.id("conversations"),
        type: v.optional(
            v.union( 
                v.literal("onlyMessage"),
                v.literal("onlyFiles"),
                v.literal("messageWithFiles"),
            )
        ),
        replayToMessageId: v.optional(v.id("messages")),
        reported: v.optional(v.boolean()),
        firstMessage: v.optional(v.boolean()),
    })
        .index('by_conversationId', ['conversationId'])
        .index('by_lastMessageUserId', ['lastMessageUserId']),
    conversations: defineTable({
        participantOneId: v.id("users"),
        participantTwoId: v.id("users"),
        proposalId: v.optional(v.id("proposals")),
    })
        .index('by_participantOneId', ['participantOneId', 'participantTwoId'])
        .index('by_participantTwoId', ['participantTwoId', 'participantOneId'])
        .index('by_porposalId', ['proposalId']),
    conversationBelongsTo: defineTable({
        userId: v.id("users"),
        conversationId: v.id("conversations"),
        belongsTo: v.union(
            v.literal("allMessages"),
            v.literal("archived"),
            v.literal("spam"),
        )
    })
        .index('by_conversationId', ['conversationId'])
        .index('by_userId', ['userId']),
    userFavorites: defineTable({
        userId: v.id("users"),
        gigId: v.id("gigs"),
    })
        .index("by_gig", ["gigId"])
        .index("by_user_gig", ["userId", "gigId"])
        .index("by_user", ["userId"]),
    favoriteConversations: defineTable({
        userId: v.id("users"),
        conversationId: v.id("conversations"),
    })
        .index("by_fav_conv", ["conversationId"]) 
        .index("by_user", ["userId"]),
    files: defineTable({
        name: v.string(),
        type: v.string(),
        size: v.optional(v.string()),
        fileId: v.id("_storage"),
        temporaryId: v.string(),
        messageId: v.optional(v.id("messages")),
        userId: v.id("users"),
    })
        .index("by_temporaryId", ["temporaryId"]) 
        .index("by_messageId", ["messageId"]) 
        .index("by_user", ["userId"]),
    messageReactions: defineTable({
        reaction: v.string(),
        messageId: v.optional(v.id("messages")),
        userId: v.id("users"),
    })
        .index("by_messageId", ["messageId"]) 
        .index("by_user", ["userId"]),
    messagesReports: defineTable({
        messageId: v.id("messages"),
        reportedFromUserId: v.id("users"),
        reportedUserId: v.id("users"),
        type: v.union(
            v.literal("outsite-platform-payment"),
            v.literal("behaved-inappropriately"),
            v.literal("spam"),
            v.literal("other"),
        ),
        otherExplanation: v.optional(v.string()),
    })
        .index("by_messageId", ["messageId"]) 
        .index("by_reportedUserId", ["reportedUserId"]) 
        .index("by_reportedFromUserId", ["reportedFromUserId"]),
    milestones: defineTable({
        workId: v.id("works"),  
        title: v.string(),
        longDescription: v.string(),
        shortDescription: v.string(),
        dueDate: v.number(),
        payment: v.number(), 
        status: v.union(
            v.literal("active"),
            v.literal("finished"),
            v.literal("inReview"),
            v.literal("rejected"),
        )
    })
        .index("by_workId", ["workId"]),
    milestoneTasks: defineTable({
        milestoneId: v.id("milestones"),
        name: v.string(),
        done: v.boolean(),
        status: v.optional(v.union(
            v.literal("inReview"),
            v.literal("rejected"),
        ))
    }),
    works: defineTable({
        userId: v.id("users"),
        clientId: v.id("users"),
        proposalId: v.id("proposals"),
        projectId: v.id("projects"), 
        status: v.optional(v.union(
            v.literal("inProgress"),
            v.literal("finished"),
            v.literal("canceled"),
        )),
    })
        .index("by_userId", ["userId"])
        .index("by_clientId", ["clientId"])
        .index("by_proposalId", ["proposalId"]),
    milestoneFiles: defineTable({
        name: v.string(),
        type: v.string(),
        size: v.optional(v.string()),
        fileId: v.id("_storage"),
        temporaryId: v.string(),
        milestoneId: v.optional(v.id("milestones")),
        variant: v.union(
            v.literal("fromClient"),
            v.literal("fromUser"),
        ),
        status: v.optional(v.union(
            v.literal("inReview"), 
            v.literal("rejected"),
            v.literal("accepted"),
        ))
    })
        .index("by_temporaryId", ["temporaryId"]) 
        .index("by_milestoneId", ["milestoneId"]), 
    milestoneComments: defineTable({
        userId: v.id("users"),
        clientId: v.id("users"),
        milestoneId: v.id("milestones"),
        comment: v.string(),
        messageOwnerId: v.id("users"),
    })
        .index("by_userId", ["userId"]) 
        .index("by_clientId", ["clientId"]) 
        .index("by_milestoneId", ["milestoneId"])
        .index("by_messageOwnerId", ["messageOwnerId"]),
    profile: defineTable({
        userId: v.id("users"),
        hoursePerWeek: v.union(
            v.literal("More than 30 hrs/week"),
            v.literal("Less than 30 hrs/week"),
            v.literal("As needed - open to offers"),
        ),
        title: v.string(),
        hourlyRate: v.number(),
        description: v.string()
    }) 
        .index("by_userId", ["userId"]),
    languages: defineTable({
        profileId: v.id("profile"),
        language: v.string(),
        proficiencyLevel: v.union(
            v.literal("Basic"), 
            v.literal("Conversational"),
            v.literal("Fluent"),
            v.literal("Native or Bilingual"),
        ),
    }) 
        .index("by_profileId", ["profileId"]),
    portfolio: defineTable({
        profileId: v.id("profile"), 
        projectTitle: v.string(),
        role: v.string(),
        description: v.string(),
        skills: v.array(v.any())
    }) 
        .index("by_profileId", ["profileId"]),
    portfolioFiles: defineTable({
        name: v.string(),
        type: v.string(),
        size: v.optional(v.string()),
        fileId: v.id("_storage"),
        temporaryId: v.string(),
        portfolioId: v.optional(v.id("portfolio")),
        profileId: v.id("profile"),
    })
        .index("by_temporaryId", ["temporaryId"]) 
        .index("by_portfolioId", ["portfolioId"]) 
        .index("by_profileId", ["profileId"]),
    profileSkills: defineTable({
        profileId: v.id("profile"),
        name: v.string(),
    })
        .index("by_profileId", ["profileId"]),
});