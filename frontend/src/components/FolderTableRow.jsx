import React from 'react'
import { useRecoilState } from 'recoil'
import { selectedDriveState } from '../store'
import Icon from './controls/Icon'

const FolderTableRow = ({ folder }) => {
    const [selectedDrive, setSelectedDrive] = useRecoilState(selectedDriveState)

    const handleClick = () => {
        if (selectedDrive && selectedDrive.uuid === folder.uuid)
            setSelectedDrive()
        else {
            setSelectedDrive(folder)
        }
    }

    return <tr key={folder.id} onClick={handleClick} className={folder?.uuid === selectedDrive?.uuid ? 'selected' : ''}>
        <td></td>
        <td>
            <div className="flex items-center cursor-pointer">
                <Icon name="folder" fill="#92CEFF" />
                <span style={{ marginLeft: '10px' }}> {folder.name}</span>
            </div>
        </td>
        <td>...</td>
        <td>{folder.created_at}</td>
        <td>...</td>
        <td>
            {/* <button className="btn">
                <span class="material-icons" style={{ color: '#555' }}>
                    more_horiz
                </span>
            </button> */}
        </td>
    </tr>
}

export default FolderTableRow
