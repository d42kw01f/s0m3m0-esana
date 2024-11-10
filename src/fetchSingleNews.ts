import axios from 'axios';
import { connectToMongo } from '../models/MConnection';
import { NewsArticle } from '../interfaces/INewsArticle';
import { ContentBlock } from '../interfaces/IContentBlock';

export async function fetchSingleHelakuruNews(id: string): Promise<void> {
    try {
        const url = `https://helakuru.bhashalanka.com/esana/news/single-news/news-${id}.json`;
        const response = await axios.get(url);
        const newsData = response.data;

        if (newsData.status.success) {
            const articleData = newsData.data[0];
            console.log(articleData);

            // Extract required fields
            const newsArticle: NewsArticle = {
                id: articleData.id,
                titleEn: articleData.titleEn,
                contentEn: articleData.contentEn,
                reactions: articleData.reactions,
                comments: articleData.comments,
                published: articleData.published,
            };

            const newsBodyText = newsArticle.contentEn
                .filter((block: ContentBlock) => block.type === 'text')
                .map((block: ContentBlock) => block.data)
                .join(' ');

            const document = {
                id: newsArticle.id,
                title: newsArticle.titleEn,
                content: newsBodyText,
                reactions: newsArticle.reactions,
                commentCount: newsArticle.comments,
                publishedAt: newsArticle.published,
            };

            const { client, collection } = await connectToMongo();
            await collection.insertOne(document);
            console.log(`Inserted article ID ${newsArticle.id} into MongoDB`);
            await client.close();
        } else {
            console.error(`Failed to fetch news article with ID ${id}`);
        }
    } catch (error) {
        console.error(`Error fetching news article with ID ${id}:`, error);
    }
}
