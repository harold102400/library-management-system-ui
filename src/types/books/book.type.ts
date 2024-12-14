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
    year: string;
    genre: string[];
    coverImage?: FileList;
    isFavorite: number;
    user_id: string;
    createdAt: string;
    updatedAt: string;
}