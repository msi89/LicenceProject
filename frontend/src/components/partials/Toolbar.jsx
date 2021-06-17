import React from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDriveState } from '../../store'
import Icon from '../controls/Icon'

const Toolbar = () => {

    const selectedDrive = useRecoilValue(selectedDriveState)

    return <div className="toolbar flex">
        <button className="btn">
            <Icon name="plus" fill="#0d4aac" size="16" />
            <span style={{ margin: '0 2px' }}>Create</span>
            <Icon name="arrow_down" size="10" fill="#555" />
        </button>

        <button className="btn">
            <span class="material-icons" style={{ color: '#0d4aac' }}>
                keyboard_arrow_down
            </span>
            <span style={{ margin: '0 2px' }}>Upload</span>
        </button>
        {selectedDrive?.id && <div className="flex">
            <button className="btn">
                <Icon name="download" className="text-primary" />
                <span style={{ margin: '0 2px' }}>Download</span>
            </button>
            <button className="btn">
                <Icon name="lock" fill="#0d4aac" size="16" />
                <span style={{ margin: '0 2px' }}>Decrypt</span>
            </button>
            <button className="btn">
                <Icon name="plus" fill="#0d4aac" size="16" />
                <span style={{ margin: '0 2px' }}>Remove</span>
            </button>
        </div>}
    </div>
}

export default Toolbar