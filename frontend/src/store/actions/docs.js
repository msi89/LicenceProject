import { useState } from "react";
import { toast } from "../../helpers";
import api from "../../helpers/api";
import Storage from "../local";



export const useDocs = () => {
    const [loading, setLoading] = useState(false);
    const [favoriteFiles, setFavoriteFiles] = useState([]);

    const fetchFavoriteFiles = async () => {
        try {
            setLoading(true)
            const res = await api.get(`/drives/documents/favorites/`);
            setFavoriteFiles(res.data)
        } catch (error) {
            toast.error(error.response?.data.detail || 'Ошибка сервера, попробуйте позже')
        } finally {
            setLoading(false)
        }
    }

    const downloadDoc = async (payload) => {
        try {
            setLoading(true)
            const response = await api.post(`/drives/documents/${payload.id}/download/`, {
                password: Storage.get('password'),
                name: payload.name
            },
                {
                    responseType: 'blob'
                });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', payload.name); //or any other extension
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.log(error.response);
            toast.error(error.response?.data.detail || 'Пароль для файла расшифровки недействителен')
        } finally {
            setLoading(false)
        }
    }

    const updateDoc = async (file, payload) => {
        try {
            setLoading(true)
            await api.patch(`/drives/documents/${file.id}/`, payload);
        } catch (error) {
            console.log(error.response);
            toast.error(error.response?.data.detail || 'Ошибка сервера, попробуйте позже')
        } finally {
            setLoading(false)
        }
    }

    const deleteDoc = async (payload) => {
        try {
            setLoading(true)
            const response = await api.delete(`/drives/documents/${payload.id}`, payload);
        } catch (error) {
            console.log(error.response);
            toast.error(error.response?.data.detail || 'Ошибка сервера, попробуйте позже')
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        downloadDoc,
        updateDoc,
        deleteDoc,
        fetchFavoriteFiles,
        favoriteFiles
    }
}




export default useDocs