import { atom } from "recoil";
import storage from './local'

export const selectedDriveState = atom({
    key: "selected-drive-state",
    default: {},
});

export const onUploadState = atom({
    key: "on-upload-state",
    default: false
});

export const breadcrumbState = atom({
    key: "breadcrumbs-state",
    default: [],
});

export const currentFolderState = atom({
    key: "current-folder-state",
    default: {
        children: [],
        documents: []
    }
});

export const uploadPasswordState = atom({
    key: "upload-password-state",
    default: storage.get('password') || '80257'
});

export const isAuthState = atom({
    key: "is-auth-state",
    default: storage.exists('token'),
});

export const authUserState = atom({
    key: "auth-user-state",
    default: storage.get('user'),
});