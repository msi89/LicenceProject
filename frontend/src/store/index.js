import { atom } from "recoil";

export const selectedDriveState = atom({
    key: "selected-drive-state",
    default: {},
});

export const onUploadState = atom({
    key: "on-upload-state",
    default: false
});

export const breadcrumbs = atom({
    key: "breadcrumbs-state",
    default: ["/"],
});

export const currentFolderState = atom({
    key: "current-folder-state",
    default: '/'
});
