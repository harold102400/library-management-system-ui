export type ApiResponseProp<T> = {
    data: T
    limit: number;
    page: number;
    totalCount: number;
}

export type BookPropType = {
    id: string;
    title: string;
    author: string;
    year: number;
    genre: string[];
    isFavorite: boolean;
    user_id: string;
    createdAt: string;
    updatedAt: string;
}