import React from 'react'
import { useRecoilState } from 'recoil'
import { selectedDriveState } from '../store'
import Icon from './controls/Icon'
import Dropdown from './controls/Dropdown'
import { downloadURI, getFileIcon } from '../helpers'
import useDocs from '../store/actions/docs'
import Storage from '../store/local'
import useDrives from '../store/actions/drives'


const FavoriteFileTableRow = ({ file }) => {

    const { downloadDoc, deleteDoc, updateDoc, fetchFavoriteFiles } = useDocs()

    const handleDownload = async () => {
        await downloadDoc(file)
    }

    const handleDelete = async () => {
        await deleteDoc(file)
        await fetchFavoriteFiles()
    }


    const handleLike = async () => {
        await updateDoc(file, { ...file, is_favorite: true })
        await fetchFavoriteFiles()
    }

    const handleDisLike = async () => {
        await updateDoc(file, { ...file, is_favorite: false })
        await fetchFavoriteFiles()
    }



    return <tr key={file.id}>
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
            <Dropdown>
                <Dropdown.Button className="btn">
                    <span className="material-icons" style={{ color: '#555' }}>
                        more_horiz
                    </span>
                </Dropdown.Button>
                <Dropdown.Content className="dropdown right-10">
                    <Dropdown.Item className="dropdown-item flex" onClick={handleDownload}>
                        <Icon name="download" className="text-primary" size={18} />
                        <span style={{ margin: '0 2px' }}>Скачать</span>
                    </Dropdown.Item>
                    {file?.is_favorite ? <Dropdown.Item className="dropdown-item flex" onClick={handleDisLike}>
                        <Icon name="love_fill" className="text-primary" size={18} />
                        <span style={{ margin: '0 2px' }}>Удалить из избранных</span>
                    </Dropdown.Item> : <Dropdown.Item className="dropdown-item flex" onClick={handleLike}>
                        <Icon name="love" className="text-primary" size={18} />
                        <span style={{ margin: '0 2px' }}>Добавить в избранное</span>
                    </Dropdown.Item>}
                    <Dropdown.Item className="dropdown-item flex" onClick={handleDelete}>
                        <Icon name="trash" className="text-primary" size={18} />
                        <span style={{ margin: '0 2px' }}>Удалить</span>
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        </td>
    </tr>
}

export default FavoriteFileTableRow
