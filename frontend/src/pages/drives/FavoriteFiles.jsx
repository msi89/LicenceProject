import React from 'react'
import MainLayout from '../../components/layouts/Main'
import FileTableRow from '../../components/FavoriteFileTableRow'
import Loader from '../../components/controls/Loader'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { selectedDriveState } from '../../store'
import useDocs from '../../store/actions/docs'


const FavoriteFiles = (props) => {
    const { loading, fetchFavoriteFiles, favoriteFiles } = useDocs()
    const setSelectedDrive = useSetRecoilState(selectedDriveState)

    React.useEffect(() => {
        setSelectedDrive()
        fetchFavoriteFiles()
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
                        {favoriteFiles.map(file => <FileTableRow key={file.id} file={file} />)}
                    </tbody>
                </table>
            </div>
            }
        </div>
    </MainLayout>
}

export default FavoriteFiles