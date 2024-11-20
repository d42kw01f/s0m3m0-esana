import axios from 'axios';
import dotenv from 'dotenv';
import { Comments } from '../interfaces/IComments';

dotenv.config();

export async function fetchNewsComments(id: string): Promise<Comments[]> {
    const c_url = `https://esana.helakuru.lk/api/4.0/v2/news/${id}/comment?lang=${process.env.LAN}`;
    const commentBlock: Comments[] = [];

    try {
        const c_response = await axios.get(c_url, {
            headers: {
                'Pro-Status': process.env.PRO_STATUS,
                'Iid': process.env.IID,
                'Uid': process.env.UID,
                'Lan': process.env.LAN,
                'Iid-Token': process.env.IID_TOKEN,
                'Pkg': process.env.PKG,
                'Api-Key': process.env.API_KEY,
                'Platform': process.env.PLATFORM,
                'Ver': process.env.VER,
                'Accept-Encoding': 'gzip, deflate, br',
                'User-Agent': process.env.USER_AGENT,
            },
        });

        const c_comments = c_response.data;

        if (c_comments.status.success) {
            if (Array.isArray(c_comments.data) && c_comments.data.length > 0) {
                for (const comment of c_comments.data) {
                    const commentMain: Comments = {
                        commentText: comment.comment || '',
                        commentReaction: comment.reactions || {},
                        commentReplyCount: Array.isArray(comment.replies) ? comment.replies.length : 0,
                        publishedAt: comment.createdOn,
                    };
                    commentBlock.push(commentMain);
                }
            }
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Error fetching comments: ${error.response?.status} - ${error.response?.statusText}`);
            console.error('Response data:', error.response?.data);
        } else {
            console.error('Unexpected error:', error);
        }
    }

    return commentBlock;
}


