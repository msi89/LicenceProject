import React from 'react'
import { useRecoilState } from 'recoil'
import { selectedDriveState } from '../store'
import Icon from './controls/Icon'
import Dropdown from './controls/Dropdown'
import { getFileIcon } from '../helpers'


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
                <Icon name={getFileIcon(file.name)} size="18" />
                <span style={{ marginLeft: '10px' }}> {file.name}</span>
            </div>
        </td>
        <td>
            {file.is_private &&
                <span className="material-icons" style={{ color: '#777' }}>
                    lock
                </span>
            }
        </td>
        <td>{file.created_at}</td>
        <td>{file.size || null}</td>
        <td>
            <Dropdown>
                <Dropdown.Button className="btn">
                    <span className="material-icons" style={{ color: '#555' }}>
                        more_horiz
                    </span>
                </Dropdown.Button>
                <Dropdown.Content className="dropdown right-10">
                    <Dropdown.Item className="dropdown-item flex">
                        <Icon name="download" className="text-primary" size={18} />
                        <span style={{ margin: '0 2px' }}>Скачать</span>
                    </Dropdown.Item>

                    {file.is_private ?
                        <Dropdown.Item className="dropdown-item flex">
                            <Icon name="unlock" className="text-primary" size={18} />
                            <span style={{ margin: '0 2px' }}>Расшифровать</span>
                        </Dropdown.Item> : <Dropdown.Item className="dropdown-item flex">
                            <Icon name="lock" className="text-primary" size={18} />
                            <span style={{ margin: '0 2px' }}>Зашифровать</span>
                        </Dropdown.Item>}
                    <Dropdown.Item className="dropdown-item flex">
                        <Icon name="trash" className="text-primary" size={18} />
                        <span style={{ margin: '0 2px' }}>Удалить</span>
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        </td>
    </tr>
}

export default FileTableRow
