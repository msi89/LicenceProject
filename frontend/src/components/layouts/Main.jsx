import React from 'react'
import Topbar from '../partials/Topbar'
import Sidebar from '../partials/Sidebar'
import Modal from '../controls/Modal'
import Dropzone from '../controls/Dropzone'

export const DropzoneContext = React.createContext({
    dropzone: null
})

const MainLayout = ({ children }) => {

    const uploadModal = React.useRef()

    return <DropzoneContext.Provider value={{
        dropzone: uploadModal.current
    }}>
        <div className="main" >
            <Sidebar />
            <div className="wrapper">
                <Topbar />
                <div>{children}</div>
            </div>
            <Modal refId={uploadModal} dismissible={false}>
                <Modal.Header>

                </Modal.Header>
                <Modal.Body>
                    <div className="relative">
                        <Dropzone></Dropzone>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    </DropzoneContext.Provider>
}

export default MainLayout