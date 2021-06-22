import React from 'react'
import Topbar from '../partials/Topbar'
import Sidebar from '../partials/Sidebar'
import Modal from '../controls/Modal'
import Uploader from '../Uploader'
import Dropzone from 'react-dropzone'
import { onUploadState } from '../../store'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Settings from '../../pages/Settings'


export const MainContext = React.createContext({
    dropfiles: null,
    setDropFiles: () => { },
    uploadModal: null,
    settingsModal: null
})

const MainLayout = ({ children }) => {
    const onUpload = useRecoilValue(onUploadState)
    const uploadModal = React.useRef()
    const settingsModal = React.useRef()

    const [dropfiles, setDropFiles] = React.useState([])

    const handleCloseModal = () => {
        uploadModal.current.close()
    }

    const onDragEnter = React.useCallback((e) => {
        console.log('onDragEnter');
    }, [])

    const onDragLeave = React.useCallback((e) => {
        console.log('onDragLeave');
    }, [])

    const onDrop = React.useCallback((acceptedFiles) => {
        console.log('onDrop', acceptedFiles);
        setDropFiles(acceptedFiles)
        uploadModal.current.open()
    }, [])


    return <MainContext.Provider value={{
        dropfiles,
        setDropFiles,
        uploadModal,
        settingsModal
    }}>
        <div className="main" >
            <Sidebar />
            <div className="wrapper">
                <Topbar />
                <Dropzone onDragEnter={onDragEnter} onDrop={onDrop} onDragLeave={onDragLeave}>
                    {({ getRootProps }) => (
                        <div {...getRootProps()}>
                            {children}
                        </div>
                    )}
                </Dropzone>
            </div>

            <Modal refId={uploadModal} dismissible={false} closable={!onUpload}>
                <Modal.Header>
                    Загрузка файлов
                </Modal.Header>
                <Modal.Body >
                    <div style={{ paddingTop: '10px' }}>
                        {dropfiles.map((file, f) => <Uploader key={f} file={file} />)}
                        <div className="flex justify-end" style={{ background: '#eee', padding: '10px' }}>
                            <button className="btn btn-primary-light" onClick={handleCloseModal}>Закрыть</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal refId={settingsModal} width="800">
                <Modal.Header>
                    Настройки
                </Modal.Header>
                <Modal.Body >
                    <Settings />
                </Modal.Body>
            </Modal>
        </div>
    </MainContext.Provider>
}

export default MainLayout