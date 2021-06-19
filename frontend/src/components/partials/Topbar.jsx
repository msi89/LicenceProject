import React from 'react'

const Topbar = () => {
    return <div className="topbar">
        <div className="search-box">
            <span className="material-icons">
                search
            </span>
            <input type="text" placeholder="search drive..." />
        </div>
        <div className="nav">
            <a href="" className="btn btn-icon">
                <span className="material-icons">
                    notifications
                </span>
            </a>
            <a href="" className="btn btn-icon">
                <span className="material-icons">
                    settings
                </span>
            </a>
            <a className="profile">
                <span>Jessica</span>
                <div className="shape-rounded center">J</div>
            </a>

            <button className="btn btn-icon">
                <span className="material-icons">
                    menu_open
                </span>
            </button>

        </div>
    </div>
}

export default Topbar