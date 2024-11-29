import axios from "axios";
import { BookPropType, ApiResponseProp } from "../types/books/book.type";


const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const token = localStorage.getItem(TOKEN_KEY)


const API_URL = import.meta.env.VITE_API_URL

export async function getAllBooks(page:number, limit: number, searchTerm: string = ""): Promise<ApiResponseProp<BookPropType[]>> {
    try {
        const res = await axios.get(`${API_URL}/books?page=${page}&limit=${limit}&search=${searchTerm}`);
        return res.data
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getBook(id: number): Promise<BookPropType> {
    try {
        const res = await axios.get(`${API_URL}/books/${id}`);
        return res.data
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function createBook(data: BookPropType) : Promise<void>
{
    try {
        const res = await axios.post(`${API_URL}/books`, data);
        if (res.status == 201) {
            console.log('Libro creado');
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function editBook(data: BookPropType, id: number) : Promise<void>
{
    try {
        const res = await axios.put(`${API_URL}/books/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        console.log(res)
        if (res.status == 200) {
            console.log('Libro editado');
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function deleteBook(id: number) : Promise<void>
{
    try {
        const res = await axios.delete(`${API_URL}/books/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (res.status == 200) {
            console.log('Libro eliminado');
        }
    } catch (error) {
        return Promise.reject(error);
    }
}


export async function registerUser(username: string, email: string, password: string): Promise<void> {
    try {
        const res = await axios.post(`${API_URL}/register`, {
            username,
            email,
            password
        })
        if (res.status == 201) {
            console.log('usuario registrado');
        }
    } catch (error) {
        return Promise.reject(error);
    }

}