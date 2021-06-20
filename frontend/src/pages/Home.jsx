import React from 'react'
import MainLayout from '../components/layouts/Main'
import FileTableRow from '../components/FileTableRow'
import FolderTableRow from '../components/FolderTableRow'
import Toolbar from '../components/partials/Toolbar'
import Loader from '../components/controls/Loader'
import { useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { selectedDriveState } from '../store'

const afolders = [
    {
        "id": 1,
        "uuid": '3ee-1',
        "name": 'Programming',
        'created_at': '10/08/2012'
    }, {
        "id": 2,
        "uuid": '3ee-2',
        "name": 'Documents',
        'created_at': '10/08/2012'
    },
]
const afiles = [
    {
        "id": 1,
        "uuid": '3ee-3',
        "name": 'doc.xls',
        "size": '239 Ko',
        'created_at': '10/08/2012'
    },
    {
        "id": 2,
        "uuid": '3ee-4',
        "name": 'aorrkk.doc',
        "size": '1025 Ko',
        'created_at': '02/11/2021'
    },
    {
        "id": 3,
        "uuid": '3ee-5',
        "name": 'aorrkk.ppt',
        "size": '1025 Ko',
        'is_private': true,
        'created_at': '02/11/2021'
    },
    {
        "id": 4,
        "uuid": '3ee-6',
        "name": 'Je me la vie.pdf',
        "size": '1025 Ko',
        'created_at': '02/11/2021'
    }
]
const Home = () => {
    const [loading, setLoading] = React.useState([])
    const [folders, setFolders] = React.useState([])
    const [files, setFiles] = React.useState([])
    const setSelectedDrive = useSetRecoilState(selectedDriveState)

    const location = useLocation();

    React.useEffect(() => {
        setSelectedDrive()
        setLoading(true)
        setTimeout(() => {
            setFolders(afolders)
            setFiles(afiles)
            setLoading(false)
        }, 500)
        console.log(location.pathname);
    }, [location]);

    return <MainLayout>

        <div className="container">

            {loading ? <Loader template="dot" /> : <div>
                <Toolbar />
                {/* <div className="drawer">gffghf fghgfhgf</div> */}

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
                        {folders.map(folder => <FolderTableRow key={folder.id} folder={folder} />)}
                        {files.map(file => <FileTableRow key={file.id} file={file} />)}
                    </tbody>
                </table>
            </div>
            }
        </div>
    </MainLayout>
}

export default Home