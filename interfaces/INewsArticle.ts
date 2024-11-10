import { ContentBlock } from './IContentBlock';
import { Reactions } from './IReactions';

export interface NewsArticle {
    id: number;
    titleEn: string;
    contentEn: ContentBlock[];
    reactions: Reactions;
    comments: number;
    published: string;
}
