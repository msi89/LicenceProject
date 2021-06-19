import React from 'react'
import styled from 'styled-components';
import MyDropzone from 'react-dropzone'

const Dropzone = () => {

    // const dragOver = (e) => {
    //     e.preventDefault();
    //     console.log('dragOver');
    // }

    // const dragEnter = (e) => {
    //     e.preventDefault();
    //     console.log('dragEnter');
    // }

    // const dragLeave = (e) => {
    //     e.preventDefault();
    //     console.log('dragLeave');
    // }

    // const fileDrop = (e) => {
    //     e.preventDefault();
    //     console.log('fileDrop');
    //     const files = e.dataTransfer.files;
    //     console.log(files);
    // }

    // return <Wrapper><div className="dropzone"
    //     onDragOver={dragOver}
    //     onDragEnter={dragEnter}
    //     onDragLeave={dragLeave}
    //     onDrop={fileDrop}>
    // </div>

    // </Wrapper>
    return <MyDropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
            <section>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            </section>
        )}
    </MyDropzone>
}

const Wrapper = styled.div`
.dropzone{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: transparent;
}
`
export default Dropzone