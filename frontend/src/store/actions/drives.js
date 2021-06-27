import { useRecoilState } from 'recoil'
import api from '../../helpers/api'
import { useState } from 'react'
import { currentFolderState } from '..';
import { toast } from '../../helpers';


export const useDrives = () => {
    const [loading, setLoading] = useState(false);
    const [currentFolder, setFolder] = useRecoilState(currentFolderState)

    const fetchCWD = async () => {
        try {
            setLoading(true)
            const response = await api.get("/drives/directories/cwd/");
            setFolder(response.data)
            return api.format(response);
        } catch (error) {
            return api.format(error.response, true);
        } finally {
            setLoading(false)
        }
    }

    const getFolder = async (folderId) => {
        try {
            setLoading(true)
            const response = await api.get(`/drives/directories/${folderId}`);
            setFolder(response.data)
            return api.format(response);
        } catch (error) {
            return api.format(error.response, true);
        } finally {
            setLoading(false)
        }
    }

    const deleteFolder = async (folderId) => {
        try {
            const response = await api.delete(`/drives/directories/${folderId}`);
            return api.format(response);
        } catch (error) {
            return api.format(error.response, true);
        }
    }

    return {
        loading,
        currentFolder,
        fetchCWD,
        getFolder,
        deleteFolder
    }
}


export const useCreateFolder = () => {
    const [loading, setLoading] = useState(false);

    const createFolder = async (payload) => {
        try {
            setLoading(true)
            const response = await api.post("/drives/directories/", payload);
        } catch (error) {
            console.log(error.response);
            toast.error(error.response?.data.detail || 'Ошибка сервера, попробуйте позже')
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        createFolder
    }
}




export default useDrives