import React from 'react'
import Topbar from '../partials/Topbar'
import Sidebar from '../partials/Sidebar'
import Modal from '../controls/Modal'
import Dropzone from '../controls/Dropzone'
import { onUploadState } from '../../store'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const DropzoneContext = React.createContext({
    dropzone: null
})

const MainLayout = ({ children }) => {
    const onUpload = useRecoilValue(onUploadState)
    const uploadModal = React.useRef()

    const handleCloseModal = () => {
        uploadModal.current.close()
    }

    return <DropzoneContext.Provider value={{
        dropzone: uploadModal.current
    }}>
        <div className="main" >
            <Sidebar />
            <div className="wrapper">
                <Topbar />
                <div>{children}</div>
            </div>
            <Modal refId={uploadModal} dismissible={false} closable={!onUpload}>
                <Modal.Header>
                    Выберите файлы
                </Modal.Header>
                <Modal.Body >
                    <div className="relative">
                        <Dropzone onClose={handleCloseModal} />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    </DropzoneContext.Provider>
}

export default MainLayout