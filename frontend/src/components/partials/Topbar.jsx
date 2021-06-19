import React from 'react'
import Dropdown from '../controls/Dropdown'

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

            <Dropdown>
                <Dropdown.Button className="profile">
                    <span>Jessica</span>
                    <div className="shape-rounded center">J</div>
                </Dropdown.Button>
                <Dropdown.Content className="dropdown">
                    <Dropdown.Item className="dropdown-item flex">
                        <span style={{ marginLeft: '5px', fontSize: '13px' }}>Выити</span>
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>


            {/* <button className="btn btn-icon">
                <span className="material-icons">
                    menu_open
                </span>
            </button> */}

        </div>
    </div>
}

export default Topbar