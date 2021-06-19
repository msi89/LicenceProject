import React from 'react'

const Loader = ({ children, template = "circle", className }) => {
    return <div className={[`${template}-loader`, className].join(' ')}>{children}</div>
}

export default Loader;