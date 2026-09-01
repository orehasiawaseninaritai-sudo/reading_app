export interface Movie {
    id: number;
    title: string;
    director: string;
    status: string;
    rating: number | null;
    comment: string | null;
}