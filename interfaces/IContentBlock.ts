export interface ContentBlock {
    type: string;
    data: string;
    options?: {
        size: string;
        alignment: string;
        is_quote: boolean;
    };
}
