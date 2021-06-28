import React from 'react'
import Icon from './controls/Icon'
import { getFileIcon } from '../helpers'


const TrashFileTableRow = ({ file }) => {



    return <tr key={file.id} >
        <td></td>
        <td>
            <div className="flex items-center  cursor-pointer">
                <Icon name={getFileIcon(file.name)} size="18" />
                <span style={{ marginLeft: '10px' }}>
                    <a href={file.url}>{file.name}</a>
                </span>
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
        <td>{file.size || null} ko</td>
        <td>
        </td>
    </tr>
}

export default TrashFileTableRow
