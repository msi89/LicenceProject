import React from 'react'
import { useRecoilState } from 'recoil'
import { breadcrumbState, selectedDriveState } from '../store'
import Icon from './controls/Icon'
import Dropdown from './controls/Dropdown'
import useDrives from '../store/actions/drives'

const FolderTableRow = ({ folder }) => {
    const [selectedDrive, setSelectedDrive] = useRecoilState(selectedDriveState)
    const { getFolder, deleteFolder, currentFolder } = useDrives()

    const [breadcrumbs, setBreadcrumb] = useRecoilState(breadcrumbState)

    const handleClick = () => {
        if (selectedDrive && selectedDrive.uuid === folder.uuid)
            setSelectedDrive()
        else {
            setSelectedDrive(folder)
        }
    }

    const handleDbClick = async () => {
        // if (breadcrumbs.findIndex(c => c?.id === currentFolder?.id) === -1) {
        //     const bcb = [...breadcrumbs]
        //     bcb.push({
        //         id: currentFolder?.id,
        //         name: currentFolder?.name
        //     })
        //     setBreadcrumb(bcb)
        // }

        await getFolder(folder.id)
        setBreadcrumb({
            id: currentFolder?.id,
            name: currentFolder?.name
        })
    }

    const handleDeleteClick = async () => {
        await deleteFolder(folder.id)
        getFolder(currentFolder.id)
    }

    return !folder?.is_deleted && <tr key={folder.id} onClick={handleClick}
        onDoubleClick={handleDbClick}
        className={folder?.uuid === selectedDrive?.uuid ? 'selected' : ''}>
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
            <Dropdown>
                <Dropdown.Button className="btn">
                    <span className="material-icons" style={{ color: '#555' }}>
                        more_horiz
                    </span>
                </Dropdown.Button>
                <Dropdown.Content className="dropdown right-10">
                    <Dropdown.Item className="dropdown-item flex" onClick={handleDeleteClick}>
                        <Icon name="trash" className="text-primary" size={18} />
                        <span style={{ margin: '0 2px' }}>Удалить</span>
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        </td>
    </tr>
}

export default FolderTableRow
