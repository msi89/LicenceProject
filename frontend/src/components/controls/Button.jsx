import React from 'react'
import styled from 'styled-components'


const Button = ({ children, className, onClick, disabled = false, loading = false, style }) => {
    return <button className={className} onClick={onClick} disabled={disabled} style={style}>
        {loading ? <Wrapper>
            <span className="btn-loading">
                <span>&bull;</span>
                <span>&bull;</span>
                <span>&bull;</span>
            </span>
        </Wrapper> : <>{children}</>}
    </button>
}


const Wrapper = styled.div`

@-webkit-keyframes opacity {
	0% { opacity: 1; }
	100% { opacity: 0; }
}
@-moz-keyframes opacity {
	0% { opacity: 1; }
	100% { opacity: 0; }
}
@keyframes opacity {
	0% { opacity: 1; }
	100% { opacity: 0; }
}

.btn-loading {
	text-align: center;
    font-size: 18px;
    font-weight: bold;
}

.btn-loading span:not(:last-child) {
	margin-right: 5px;
}

.btn-loading span {
	-webkit-animation-name: opacity;
	-webkit-animation-duration: 1s;
	-webkit-animation-iteration-count: infinite;
	
	-moz-animation-name: opacity;
	-moz-animation-duration: 1s;
	-moz-animation-iteration-count: infinite;

  animation-name: opacity;
	animation-duration: 1s;
	animation-iteration-count: infinite;
}

.btn-loading span:nth-child(2) {
	-webkit-animation-delay: 100ms;
	-moz-animation-delay: 100ms;
  animation-delay: 100ms;
}

.btn-loading span:nth-child(3) {
	-webkit-animation-delay: 300ms;
	-moz-animation-delay: 300ms;
  animation-delay: 300ms;
}

`

export default Button