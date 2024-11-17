import { fetchSingleHelakuruNews } from './fetchSingleNews';
import { logger } from '../utils/logger';
import dotenv from 'dotenv';

dotenv.config();

function getNewsIds(): string[] {
    const newsIdsString = process.env.NEWS_IDS;
    if (!newsIdsString) {
        logger.error('NEWS_IDS is not defined in the .env file');
        return [];
    }
    return newsIdsString.split(',').map((id) => id.trim());
}

async function fetchMultipleHelakuruNews(newsIds: string[]): Promise<void> {
    if (newsIds.length === 0) {
        logger.warn('No news IDs to fetch.');
        return;
    }

    logger.info('Started Helakuru Scraper');
    logger.info('Fetching news for the following IDs:', newsIds);

    for (const id of newsIds) {
        try {
            await fetchSingleHelakuruNews(id);
            logger.info(`Successfully fetched news for ID: ${id}`);
        } catch (error) {
            logger.error(`Error fetching news for ID: ${id}`, error);
        }
    }

    logger.info('Finished fetching all news articles.');
}

const newsIdsArr = getNewsIds();
fetchMultipleHelakuruNews(newsIdsArr).catch((error) =>
    logger.error('ERROR: fetching multiple news articles:', error)
);
