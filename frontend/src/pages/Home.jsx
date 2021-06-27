import React from 'react'
import MainLayout from '../components/layouts/Main'
import FileTableRow from '../components/FileTableRow'
import FolderTableRow from '../components/FolderTableRow'
import Toolbar from '../components/partials/Toolbar'
import Loader from '../components/controls/Loader'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { breadcrumbState, selectedDriveState } from '../store'
import useDrives from '../store/actions/drives'
import Breadcrumb from '../components/partials/Breadcrumb'


const Home = (props) => {
    const { loading, fetchCWD, currentFolder } = useDrives()
    const setSelectedDrive = useSetRecoilState(selectedDriveState)

    React.useEffect(() => {
        setSelectedDrive()
        fetchCWD()
    }, []);





    return <MainLayout>

        <div className="container">

            {loading ? <Loader template="dot" /> : <div>
                <Toolbar />
                <Breadcrumb />
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
                        {currentFolder?.children.map(folder => <FolderTableRow key={folder.id} folder={folder} />)}
                        {currentFolder?.documents.map(file => <FileTableRow key={file.id} file={file} />)}
                    </tbody>
                </table>
            </div>
            }
        </div>
    </MainLayout>
}

export default Home