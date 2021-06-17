import React from 'react'
import { useRecoilState } from 'recoil'
import { selectedDriveState } from '../store'
import Icon from './controls/Icon'

function getExt(filename) {
    return filename.split('.').pop()
}

const getTypeIcon = (filename) => {
    const ext = getExt(filename + "".toLowerCase())
    if (['doc', 'docx', 'docm', 'ttf'].includes(ext)) {
        return 'msword'
    }
    if (['pptm', 'pptx', 'ppt'].includes(ext)) {
        return 'mspowerpoint'
    }
    if (['xls', 'xlsx', 'xlsm', 'xlsb', 'xltx'].includes(ext)) {
        return 'msexcel'
    }
    if (['pdf', 'ps', 'eps'].includes(ext)) {
        return 'pdf-2'
    }
    return 'file'
}

const FileTableRow = ({ file }) => {

    const [selectedDrive, setSelectedDrive] = useRecoilState(selectedDriveState)

    const handleClick = () => {
        if (selectedDrive && selectedDrive.uuid === file.uuid)
            setSelectedDrive()
        else {
            setSelectedDrive(file)
        }
    }

    return <tr key={file.id} onClick={handleClick} className={file?.uuid === selectedDrive?.uuid ? 'selected' : ''}>
        <td></td>
        <td>
            <div className="flex items-center  cursor-pointer">
                <Icon name={getTypeIcon(file.name)} size="18" />
                <span style={{ marginLeft: '10px' }}> {file.name}</span>
            </div>
        </td>
        <td>
            {file.is_private &&
                <span class="material-icons" style={{ color: '#777' }}>
                    lock
                </span>
            }
        </td>
        <td>{file.created_at}</td>
        <td>{file.size || null}</td>
        <td>
            {/* <button className="btn">
                <span class="material-icons" style={{ color: '#555' }}>
                    more_horiz
                </span>
            </button> */}
        </td>
    </tr>
}

export default FileTableRow
