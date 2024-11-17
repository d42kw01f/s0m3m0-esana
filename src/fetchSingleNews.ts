import axios from 'axios';
import { connectToMongo } from '../models/MConnection';
import { NewsArticle } from '../interfaces/INewsArticle';
import { ContentBlock } from '../interfaces/IContentBlock';
import { logger } from '../utils/logger';
import { fetchNewsComments } from './fetchNewsComments';
import { Comments } from '../interfaces/IComments';

export async function fetchSingleHelakuruNews(id: string): Promise<void> {
    try {
        logger.info(`[INFO] Started fetch - ${id}`);

        const url = `https://helakuru.bhashalanka.com/esana/news/single-news/news-${id}.json`;
        const response = await axios.get(url);
        const newsData = response.data;

        logger.info(`[INFO] Status code: ${response.status}`);

        if (newsData.status.success) {
            const articleData = newsData.data[0];

            // Fetch comments
            const comments: Comments[] = await fetchNewsComments(id);

            // Extract required fields and convert `published` and `scraped` to the target format
            const newsArticle: NewsArticle = {
                id: articleData.id,
                titleEn: articleData.titleEn,
                titleSi: articleData.titleSi,
                contentEn: articleData.contentEn,
                contentSi: articleData.contentSi,
                topComments: comments, // Fetch comments are correctly assigned here
                reactions: articleData.reactions,
                comments: articleData.comments,
                published: formatToMatchPythonExpectedFormat(articleData.published),
                scraped: getCurrentDateTimeInPythonFormat(),
            };

            logger.info(`[INFO] Fetched data: ${JSON.stringify(newsArticle)}`);

            const newsBodyTextEn = newsArticle.contentEn
                .filter((block: ContentBlock) => block.type === 'text')
                .map((block: ContentBlock) => block.data)
                .join(' ');

            const newsBodyTextLl: string = newsArticle.contentSi
                .filter((block: ContentBlock) => block.type === 'text')
                .map((block: ContentBlock) => block.data)
                .join(' ');

            // Ensure `topComments` (fetched comments) is used in the document
            const document = {
                newsId: newsArticle.id,
                newsTitleEn: newsArticle.titleEn,
                newsContentEn: newsBodyTextEn,
                newsTitleLl: newsArticle.titleSi,
                newsContentLl: newsBodyTextLl,
                top_comments: newsArticle.topComments, // Correctly pass fetched comments
                reactions: newsArticle.reactions,
                commentCount: newsArticle.comments,
                publishedAt: newsArticle.published,
                scrapedAt: newsArticle.scraped,
            };

            // Insert into MongoDB
            const { client, collection } = await connectToMongo();
            await collection.insertOne(document);
            logger.info(`[INFO] Inserted article ID ${newsArticle.id} into MongoDB`);
            await client.close();
        } else {
            logger.error(`[ERROR] Failed to fetch news article with ID ${id}`);
        }
    } catch (error) {
        logger.error(`[ERROR] Fetching news article with ID ${id}: ${error}`);
    }
}

// Formats date to match Python's expected format (e.g., 'Mon Sep 20 2024 07:55:00 GMT+0000')
function formatToMatchPythonExpectedFormat(dateString: string): string {
    const date = new Date(dateString);
    return date.toUTCString().replace('GMT', 'GMT+0000');
}

// Get current date in Python-compatible format (e.g., 'Mon Sep 20 2024 07:55:00 GMT+0000')
function getCurrentDateTimeInPythonFormat(): string {
    const now = new Date();
    return now.toUTCString().replace('GMT', 'GMT+0000');
}
