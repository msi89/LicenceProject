import React, { useState, useImperativeHandle } from "react";
import styled from 'styled-components'


const Context = React.createContext({ visible: false, closable: true, setVisible: () => { } })

const Header = ({ children }) => {
    const { closable, setVisible } = React.useContext(Context)
    const closeHandler = () => {
        setVisible(false);
    };

    return <div className="popup-header">
        <div className="popup-title">{children}</div>
        {closable && (
            <span className="popup-close" onClick={closeHandler}>
                &times;
            </span>
        )}
    </div>
}

const Body = ({ children, className }) => {
    return <div className={["popup-body", className].join(" ")}>
        {children}
    </div>
}

const Modal = ({ children, width, refId, closable = true, dismissible = true }) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(refId, () => ({
        open() {
            setVisible(true);
        },
        close() {
            setVisible(false);
        },
    }));

    function handleDismiss(e) {
        if (dismissible && e.target.id && e.target.id === 'popup-overlay') {
            setVisible(false);
        }
    }

    return (
        <Wrapper>
            <Context.Provider value={{ visible, setVisible, closable }} >
                <div className={`popup ${visible ? "visible" : ""}`} ref={refId} id="popup-overlay" onClick={handleDismiss}>
                    <div className="popup-content" style={{ width: `${width || 600}px` }}>
                        {children}
                    </div>
                </div>
            </Context.Provider>
        </Wrapper>
    );
};

Modal.Header = Header
Modal.Body = Body

const Wrapper = styled.div`
/* POPUP  */
.popup {
  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  visibility: hidden;
  overflow-x: hidden;
  overflow-y: auto;
  align-items: center;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
  opacity: 0;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.65);
}
.popup.visible {
  visibility: visible;
  opacity: 1;
}
.popup .popup-content {
  position: relative;
  visibility: hidden;
  min-width: 372px;
  margin: auto;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out,
    transform 0.4s ease-in-out;
  transform: scale(0.5);
  opacity: 0;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  outline: none;
}
.popup.visible .popup-content {
  visibility: visible;
  transform: translateY(0) scale(1);
  opacity: 1;
}
.popup .popup-header {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.popup .popup-title {
  font-weight: normal;
  font-size: 1.5rem;
  flex: auto;
}
.popup .popup-close {
  font-size: 1.5rem;
  cursor: pointer;
}
.popup .popup-body {
  overflow: hidden;
}
.popup .popup-close:hover {
  color: rgba(0, 0, 0, 0.3);
}
`

export default Modal;