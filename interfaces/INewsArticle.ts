import { ContentBlock } from './IContentBlock';
import { Reactions } from './IReactions';
import {Comments} from "./IComments";

export interface NewsArticle {
    id: number;
    titleEn: string;
    titleSi: string;
    contentEn: ContentBlock[];
    contentSi: ContentBlock[];
    topComments: Comments[];
    reactions: Reactions;
    comments: number;
    published: string;
    scraped: string;
}
