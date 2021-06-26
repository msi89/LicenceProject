import React from 'react'

const AccountSettings = () => {

    return <div style={{ padding: '10px' }}>
        <div className="flex">
            <div className="flex flex-col flex-1">
                <label>Имя</label>
                <input type="text" className="input" />
            </div>
            <div className="flex flex-col flex-1" style={{ marginLeft: '10px' }}>
                <label>Фамиля</label>
                <input type="text" className="input" />
            </div>
        </div>

        <div className="flex" style={{ marginTop: '20px' }} >
            <div className="flex flex-col flex-1">
                <label>Электронная почта</label>
                <input type="email" className="input" />
            </div>
            <div className="flex flex-col flex-1" style={{ marginLeft: '10px' }}>
                <label>Телефон</label>
                <input type="text" className="input" />
            </div>
        </div>
        <div className="flex" style={{ marginTop: '40px' }}>
            <button className="btn btn-primary" style={{ marginRight: '10px' }}>Сохранить</button>
            <button className="btn btn-primary-light">Отменить</button>
        </div>

    </div>
}

export default AccountSettings