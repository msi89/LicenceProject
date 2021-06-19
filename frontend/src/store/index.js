import { atom } from "recoil";

export const selectedDriveState = atom({
    key: "selected-drive-state",
    default: {},
});

export const uploadFileState = atom({
    key: "upload-file-state",
    default: [],
    dangerouslyAllowMutability: true
});

export const breadcrumbs = atom({
    key: "breadcrumbs-state",
    default: ["/"],
});

export const currentFolderState = atom({
    key: "current-folder-state",
    default: '/'
});
