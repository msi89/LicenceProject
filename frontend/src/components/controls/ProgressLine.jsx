import styled from "styled-components";
import React from 'react'

const ProgressLine = () => {
  return <Wrapper>
    <div className="progress-line"></div>
  </Wrapper>
}

const Wrapper = styled.div`
.progress-line, .progress-line:before {
  height: 2px;
  width: 100%;
  margin: 0;
}
.progress-line {
  background-color: transparent;
  display: -webkit-flex;
  display: flex;
}
.progress-line:before {
  background-color: #2262C6;
  content: '';
  -webkit-animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@-webkit-keyframes running-progress {
  0% { margin-left: 0px; margin-right: 100%; }
  50% { margin-left: 25%; margin-right: 0%; }
  100% { margin-left: 100%; margin-right: 0; }
}
@keyframes running-progress {
  0% { margin-left: 0px; margin-right: 100%; }
  50% { margin-left: 25%; margin-right: 0%; }
  100% { margin-left: 100%; margin-right: 0; }
}
`

export default ProgressLine