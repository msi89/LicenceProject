
import Toastly from "@msic89/toastly";

export const toast = new Toastly({
    timeout: 4000,
    position: "bottom-right",
    dismissible: true,
});

export function getFileExtension(filename) {
    return filename.split('.').pop()
}

export const getFileIcon = (filename) => {
    const ext = getFileExtension(filename + "".toLowerCase())
    if (['doc', 'docx', 'docm', 'ttf'].includes(ext)) {
        return 'msword'
    }
    if (['pptm', 'pptx', 'ppt'].includes(ext)) {
        return 'mspowerpoint'
    }
    if (['xls', 'xlsx', 'xlsm', 'xlsb', 'xltx'].includes(ext)) {
        return 'msexcel'
    }
    if (['pdf', 'ps', 'eps'].includes(ext)) {
        return 'pdf-2'
    }
    return 'file'
}

export default {
    getFileExtension,
    getFileIcon
}