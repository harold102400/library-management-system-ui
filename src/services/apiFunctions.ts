import axios from "axios";
import { BookPropType, ApiResponseProp } from "../types/books/book.type";
import { API_URL } from "../config/config";
import api from "../api/api";

export async function getAllBooks(page:number, limit: number, searchTerm: string = ""): Promise<ApiResponseProp<BookPropType[]>> {
    try {
        const res = await api.get(`${API_URL}/books?page=${page}&limit=${limit}&search=${searchTerm}`);
        return res.data
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getBook(id: number): Promise<BookPropType> {
    try {
        const res = await api.get(`${API_URL}/books/${id}`);
        return res.data
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function createBook(data: BookPropType) : Promise<void>
{
    try {
        await api.post(`${API_URL}/books`, data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function editBook(data: BookPropType, id: number) : Promise<void>
{
    try {
        await api.put(`/books/${id}`, data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function isFavorite(isFavorite: number, id: number) : Promise<void>
{
    try {
        await api.patch(`/books/${id}`, {isFavorite});
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function deleteBook(id: number) : Promise<void>
{
    try {
        await api.delete(`${API_URL}/books/${id}`);
    } catch (error) {
        return Promise.reject(error);
    }
}


export async function registerUser(username: string, email: string, password: string): Promise<void> {
    try {
        await axios.post(`${API_URL}/register`, {
            username,
            email,
            password
        })
    } catch (error) {
        return Promise.reject(error);
    }

}