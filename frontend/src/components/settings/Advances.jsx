import React from 'react'
import { useRecoilState } from 'recoil'
import { toast } from '../../helpers'
import { uploadPasswordState } from '../../store'
import Storage from '../../store/local'

const AdvanceSettings = () => {

    const [password, setPassword] = useRecoilState(uploadPasswordState)

    const handleChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSavePassword = () => {
        Storage.set('password', password)
        toast.success('Сохранение зашифрованного пароля')
    }

    const handleCancel = () => {
        setPassword(Storage.get('password'))
    }

    return <div style={{ padding: '10px' }}>
        <table className="table">
            <tbody>
                <tr>
                    <td>Загружен пароль</td>
                    <td><input type="text" className="input" onChange={handleChange} /></td>
                </tr>
            </tbody>
        </table>

        <div className="flex justify-end" style={{ marginTop: '40px' }}>
            <button className="btn btn-primary" style={{ marginRight: '10px' }}
                onClick={handleSavePassword}>Сохранить</button>
            <button className="btn btn-primary-light" onClick={handleCancel}>Отменить</button>
        </div>
    </div>
}

export default AdvanceSettings