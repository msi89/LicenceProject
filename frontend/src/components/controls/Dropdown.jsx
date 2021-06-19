import React from 'react'
import styled from 'styled-components'

const Context = React.createContext({ visible: false, setVisible: () => { } })

const Toggle = ({ children, className, onClick = null }) => {
    const { visible, setVisible } = React.useContext(Context)

    function handleToggle() {
        setVisible(!visible)
        if (onClick)
            onClick()
    }

    React.useEffect(() => {
        if (visible)
            setTimeout(() => document.addEventListener('click', handleToggle), 200)
        return () => {
            setTimeout(() => document.removeEventListener('click', handleToggle), 200)
        }
    }, [visible])

    return <div className={className}
        onClick={handleToggle}>
        {children}
    </div>
}

const Content = ({ children, className, activeClass = 'visible' }) => {
    const { visible } = React.useContext(Context)
    return <div className={[className, visible ? activeClass : ''].join(' ')}> {children}</div>
}

const Item = ({ children, className, onClick }) => {
    return <div className={className} onClick={onClick}>{children}</div>
}

const Dropdown = ({ children, className }) => {
    const [visible, setVisible] = React.useState(false)

    return <div className={className}>
        <Context.Provider value={{ visible, setVisible }}>
            {children}
        </Context.Provider>
    </div>
}

Dropdown.Button = Toggle
Dropdown.Content = Content
Dropdown.Item = Item

export default Dropdown