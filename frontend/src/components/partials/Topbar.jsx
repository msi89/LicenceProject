import React from 'react'

const Topbar = () => {
    return <div className="topbar">
        <div className="search-box">
            <span class="material-icons">
                search
            </span>
            <input type="text" placeholder="search drive..." />
        </div>
        <div className="nav">
            <a href="" className="btn btn-icon">
                <span class="material-icons">
                    notifications
                </span>
            </a>
            <a href="" className="btn btn-icon">
                <span class="material-icons">
                    settings
                </span>
            </a>
            <a className="profile">
                <span>Jessica</span>
                <div className="shape-rounded center">J</div>
            </a>
        </div>
    </div>
}

export default Topbar