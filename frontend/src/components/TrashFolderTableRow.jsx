import React from 'react'
import { useRecoilState } from 'recoil'
import { breadcrumbState, selectedDriveState } from '../store'
import Icon from './controls/Icon'

const TrashFolderTableRow = ({ folder }) => {

    return <tr key={folder.id}>
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
        </td>
    </tr>
}

export default TrashFolderTableRow
