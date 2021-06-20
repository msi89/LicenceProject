import React from 'react'
import styled from 'styled-components'
import Icon from './controls/Icon'
import ProgressLine from './controls/ProgressLine'
import { getFileIcon } from '../helpers'

const Uploader = ({ file }) => {

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("error survenue")

    return <Wrapper>
        <div className="uploader">
            <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                <div className="flex">
                    <Icon name={getFileIcon(file?.name)} />
                    <span style={{ marginLeft: '10px' }}> {file?.name}</span>
                </div>
                <div>
                    {loading && <button className="btn b-icon" style={{ background: 'crimson', color: '#fff' }}>
                        <Icon name="x" size={16} />
                    </button>}
                    {error ? <button className="btn b-icon" style={{ color: '#2262C6' }}>
                        <Icon name="refresh" size={20} />
                    </button> :
                        <button className="btn b-icon" style={{ background: '#03a803', color: '#fff' }}>
                            <Icon name="check" size={16} />
                        </button>}
                </div>
            </div>
            {error && <div style={{ fontSize: '12px', color: 'crimson' }}>{error}</div>}
            {loading && <ProgressLine />}
        </div>
    </Wrapper>
}

const Wrapper = styled.div`
.uploader{
   padding: 5px 15px;
}
.b-icon{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    /* color: #03a803 */
}
`

export default Uploader

