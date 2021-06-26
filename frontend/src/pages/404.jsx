import React from 'react'
import { BaseLink } from '../components/partials/NavItem'

const NotFound = () => {
    return <div className="page flex center" style={{ fontSize: '24px' }}>
        <div className="flex flex-col center" style={{ width: '500px' }}>
            <h1 className="text-primary">Oops!</h1>
            <h3>Page not found</h3>
            <div style={{ fontSize: '14px', textAlign: 'center', width: '400px', margin: '30px 0' }}>
                This link you clicked maybe broken or the may have been removed or renamed.
            </div>
            <BaseLink to="/" className="btn btn-primary">
                <span className="material-icons">
                    arrow_back
                </span>
                <span style={{ marginLeft: '5px', fontSize: '14px' }}>Go back</span>
            </BaseLink>
        </div>
    </div>
}
export default NotFound