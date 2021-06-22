import React from 'react'
import styled from 'styled-components';
import Dropzone from 'react-dropzone'
import Uploader from '../Uploader'
import { useSetRecoilState } from 'recoil';
import { onUploadState } from '../../store';

const MyDropzone = ({ onClose }) => {
    const setOnUpload = useSetRecoilState(onUploadState)
    const [visible, setVisible] = React.useState(true)
    const [ondrag, setOndrag] = React.useState(false)
    const [files, setFiles] = React.useState([])

    const onDragEnter = React.useCallback((e) => {
        setOndrag(true)
    }, [])

    const onDragLeave = React.useCallback((e) => {
        setOndrag(false)
        console.log('onDragLeave');
    }, [])

    const onDrop = React.useCallback((acceptedFiles) => {
        setFiles(acceptedFiles)
        setVisible(false)
        setOnUpload(true)
        console.log('onDrop');
    }, [])

    const handleClose = React.useCallback(() => {
        if (onClose)
            onClose()
        setOnUpload(false)
        setVisible(true)
        setFiles([])
        setOndrag(false)
    })

    return <Wrapper >
        {visible ? <Dropzone onDragEnter={onDragEnter} onDrop={onDrop} onDragLeave={onDragLeave}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className={[
                    'dropzone',
                    visible ? 'visible' : '',
                    ondrag ? 'ondrag' : ''
                ].join(' ')}>
                    <input {...getInputProps()} />
                    <p>Перетащите сюда несколько или нажмите для выбора файлов</p>
                </div>
            )}
        </Dropzone> :
            <div style={{ paddingTop: '10px' }}>
                {files.map((file, f) => <Uploader key={f} file={file} />)}
                <div className="flex justify-end" style={{ background: '#eee', padding: '10px' }}>
                    <button className="btn btn-primary-light" onClick={handleClose}>Закрыть</button>
                </div>
            </div>}
    </Wrapper>
}

const Wrapper = styled.div`
.dropzone{
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height:400px;
  margin:10px;
  border: 1px dashed rgba(0, 0, 0, 0.4);
  visibility: hidden;
  color: rgba(0, 0, 0, 0.4)
}
.dropzone p{
    text-align: center;
    width: 300px;
}
.dropzone.visible{
    visibility: visible;
}
.dropzone.ondrag{
    border: 2px dashed #0d4aac;
    color: #0d4aac;
}
`
export default MyDropzone