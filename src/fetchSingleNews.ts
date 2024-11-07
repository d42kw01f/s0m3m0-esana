import axios, { AxiosResponse } from 'axios';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Interface representing the structure of the news data.
 * Update this interface based on the actual response structure.
 */
interface NewsData {
    id: string;
    title: string;
    content: string;
}

/**
 * Fetches a single news item from Helakuru's API and saves it to a JSON file.
 */
export async function fetchSingleHelakuruNews(newsId: string) {
    const url = 'https://helakuru.bhashalanka.com/esana/news/single-news/news-103530.json';

    const headers = {
        'Host': 'helakuru.bhashalanka.com',
        'Pro-Status': process.env.PRO_STATUS || '',
        'Iid': process.env.IID || '',
        'Uid': process.env.UID || '',
        'Lan': process.env.LAN || '',
        'Iid-Token': process.env.IID_TOKEN || '',
        'Pkg': process.env.PKG || '',
        'Api-Key': process.env.API_KEY || '',
        'Platform': process.env.PLATFORM || '',
        'Ver': process.env.VER || '',
        'Accept-Encoding': 'gzip, deflate, br',
        'User-Agent': process.env.USER_AGENT || '',
    };

    const newsDir = path.join(__dirname, '..', 'news_dir');

    try {
        await fs.mkdir(newsDir, { recursive: true });
        const response: AxiosResponse<NewsData> = await axios.get(url, { headers });
        console.log('Status Code:', response.status);

        const fileName = `${newsId}.json`;
        const filePath = path.join(newsDir, fileName);
        const jsonData = JSON.stringify(response.data, null, 2);

        await fs.writeFile(filePath, jsonData, 'utf-8');
        console.log(`Response data has been saved to ${filePath}`);

    } catch (error) {
        // Handle errors appropriately
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            if (error.response) {
                console.error('Status Code:', error.response.status);
                console.error('Response Headers:', error.response.headers);
                console.error('Response Data:', error.response.data);
            }
        } else if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unexpected Error:', error);
        }
    }
}

