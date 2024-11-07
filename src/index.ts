import { fetchSingleHelakuruNews } from './fetchSingleNews'

const newsIdsArr:string[] = [
    '103530',
    '103531'
]

async function fetchMultipleHelakuruNews(newsIdsArr: string[]): Promise<void> {
    for (const id of newsIdsArr) {
        await fetchSingleHelakuruNews(id).then(r => 'ERROR: Something went wrong');
    }
}

fetchMultipleHelakuruNews(newsIdsArr).then(r => 'ERROR: Something went wrong');