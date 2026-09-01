export interface Book {
    id: number;
    title: string;
    author: string;
    status: string;
    rating: number | null;
    comment: string | null;
}