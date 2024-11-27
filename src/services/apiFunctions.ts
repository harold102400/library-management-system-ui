import axios from "axios";
import { BookPropType, Response } from "../types/books/book.type";


const API_URL = import.meta.env.VITE_API_URL

export async function getAllBooks(): Promise<Response<BookPropType>> {
    try {
        const res = await axios.get(`${API_URL}/books`);
        console.log(res);
        return res.data
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function createProduct(data: BookPropType) : Promise<void>
{
    try {
        const res = await axios(`${API_URL}/books`, {data});
        if (res.status == 200) {
            console.log('Libro creado');
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function editProduct(data: BookPropType, id: number) : Promise<void>
{
    try {
        const res = await axios.put(`${API_URL}/books/${id}`, {data});
        if (res.status == 200) {
            console.log('Libro editado');
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function deleteProduct(id: number) : Promise<void>
{
    try {
        const res = await axios.delete(`${API_URL}/books/${id}`);
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