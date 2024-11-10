import { fetchSingleHelakuruNews } from './fetchSingleNews';

const newsIdsArr: string[] = [
    '103532',
    '103533',
    // Add more IDs as needed
];

async function fetchMultipleHelakuruNews(newsIds: string[]): Promise<void> {
    for (const id of newsIds) {
        await fetchSingleHelakuruNews(id);
    }
}

fetchMultipleHelakuruNews(newsIdsArr)
    .then(() => console.log('Finished fetching all news articles'))
    .catch((error) => console.error('Error fetching multiple news articles:', error));
