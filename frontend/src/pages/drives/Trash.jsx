import React from 'react'
import MainLayout from '../../components/layouts/Main'
import TrashFileTableRow from '../../components/TrashFileTableRow'
import TrashFolderTableRow from '../../components/TrashFolderTableRow'
import Loader from '../../components/controls/Loader'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { selectedDriveState } from '../../store'
import { useTrash } from '../../store/actions/drives'


const Trash = (props) => {
    const { loading, fetchDeletedFiles, fetchDeletedFolders, deletedFiles, deletedFolder } = useTrash()
    const setSelectedDrive = useSetRecoilState(selectedDriveState)

    React.useEffect(() => {
        setSelectedDrive()
        fetchDeletedFolders()
        fetchDeletedFiles()
    }, []);


    return <MainLayout>

        <div className="container">
            {loading ? <Loader template="dot" /> : <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Sharing</th>
                            <th>Last modified</th>
                            <th>Size</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {deletedFolder.map(folder => <TrashFolderTableRow key={folder.id} folder={folder} />)}
                        {deletedFiles.map(file => <TrashFileTableRow key={file.id} file={file} />)}
                    </tbody>
                </table>
            </div>
            }
        </div>
    </MainLayout>
}

export default Trash