import { Reactions } from "./IReactions";

export interface Comments {
    commentText: string;
    commentReaction: Reactions;
    commentReplyCount: number;
    publishedAt: string;
}