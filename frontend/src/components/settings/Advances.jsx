import React from 'react'

const AdvanceSettings = () => {

    return <div style={{ padding: '10px' }}>
        <table className="table">
            <tbody>
                <tr>
                    <td>Загружен пароль</td>
                    <td><input type="password" className="input" /></td>
                </tr>
            </tbody>
        </table>

        <div className="flex justify-end" style={{ marginTop: '40px' }}>
            <button className="btn btn-primary" style={{ marginRight: '10px' }}>Сохранить</button>
            <button className="btn btn-primary-light">Отменить</button>
        </div>
    </div>
}

export default AdvanceSettings