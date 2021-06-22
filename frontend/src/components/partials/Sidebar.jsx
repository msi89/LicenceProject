import React from 'react'
import { NavLink } from 'react-router-dom'
import { MainContext } from '../layouts/Main'

const Sidebar = () => {
    const { uploadModal, setDropFiles } = React.useContext(MainContext)
    const inputFile = React.useRef()

    const HandleUploadFile = (e) => {
        setDropFiles(Array.from(e.target.files))
        uploadModal.current.open()
    }


    return <div className="sidebar">
        <div className="brand-logo">
            <input type="file" ref={inputFile} multiple onChange={HandleUploadFile}
                style={{ visibility: 'hidden', position: 'absolute' }} />
            <div className="logo">
                <svg enableBackground="new 0 0 503.589 503.589"
                    viewBox="0 0 503.589 503.589" xmlns="http://www.w3.org/2000/svg">
                    <g><path d="m69.954 459.229 168.711-291.214-71.765-123.863-166.9 290.897z" />
                        <path d="m503.355 319.98-166.877-290.858h-143.615l168.521 290.858z" />
                        <path d="m167.917 349.98-72.12 124.488h337.666l70.126-124.488z" />
                    </g>
                </svg>
            </div>
            <div className="logo-text">AESDrive</div>
        </div>
        <div className="sidebar-content">
            <div className="sidebar-header">

                <button className="btn button-upload-file"
                    onClick={() => inputFile.current.click()}>
                    Upload new file
                </button>
            </div>
            <ul className="sidebar-nav">
                <li>
                    <NavLink to="/" exact className="sidebar-nav-item">
                        <span className="material-icons">
                            laptop
                        </span>
                        <span>Computer</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/recents" className="sidebar-nav-item">
                        <span className="material-icons">
                            history
                        </span>
                        <span>Recents</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/shared" className="sidebar-nav-item">
                        <span className="material-icons">
                            folder_shared
                        </span>
                        <span>Shared</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/favorites" className="sidebar-nav-item">
                        <span className="material-icons">
                            star_purple500
                        </span>
                        <span>Favorites</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/trash" className="sidebar-nav-item">
                        <span className="material-icons">
                            delete_outline
                        </span>
                        <span>Trash</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    </div>
}

export default Sidebar