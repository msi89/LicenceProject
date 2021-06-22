import styled from "styled-components";
import React from 'react'
import AdvanceSettings from '../components/settings/Advances'
import AccountSettings from '../components/settings/Account'

const Settings = () => {
    const [tab, setTab] = React.useState(0)
    const handleTabClick = (selectedTab) => {
        setTab(selectedTab)
    }

    return <Wrapper><div>
        <div className="flex tab__header">
            <div className={`tab_header_item ${tab === 0 ? 'active' : ''}`} onClick={() => handleTabClick(0)}>Profile</div>
            <div className={`tab_header_item ${tab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>Advanced</div>
        </div>
        <div className="content px-2">
            {tab === 0 && <AccountSettings />}
            {tab === 1 && <AdvanceSettings />}
        </div>
    </div>
    </Wrapper>
}

const Wrapper = styled.div`
.content{
  min-height: 50vh;
  background: #fff;
}
.tab__header{
  background: #c5c3c3;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.tab_header_item{
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    padding: 15px 10px;
    border-bottom: 2px solid transparent;
}
.tab_header_item:hover{
    color: var(--main-color-dark);
    cursor: pointer;
}
.tab_header_item.active{
    color: var(--main-color-dark);
    border-color: var(--main-color);
}
.link__sync::hover{
    color: var(--main-color-dark);
    text-decoration: underline;
}

`

export default Settings;