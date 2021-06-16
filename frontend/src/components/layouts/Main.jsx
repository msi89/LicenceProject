import React from 'react'
import Topbar from '../partials/Topbar'
import Sidebar from '../partials/Sidebar'

const MainLayout = ({ children }) => {
    return <div className="main">
        <Sidebar />
        <div className="wrapper">
            <Topbar />
            <div>{children}</div>
        </div>
    </div>
}

export default MainLayout