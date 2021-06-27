import React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { breadcrumbState } from '../../store'
import useDrives from '../../store/actions/drives'

const Breadcrumb = () => {
    const breadcrumbs = useRecoilValue(breadcrumbState)
    const { getFolder } = useDrives()

    const handleClick = async (b) => {
        await getFolder(b.id)
    }

    return <Wrapper>
        <div className="flex">
            {/* {breadcrumbs.map((bread, b) => <div className=" bread" key={b} onClick={() => handleClick(bread)}>
                {bread?.name}
            </div>)} */}
            <div className=" bread" onClick={() => handleClick(breadcrumbs)}>
                {breadcrumbs?.name}
            </div>
        </div>
    </Wrapper>
}
const Wrapper = styled.div`
.breadcrumbs{
   
}
.bread{
    cursor: pointer;
    margin: 5px 5px;
    color: var(--main-color);
}.bread:hover{
    text-decoration: underline;
}
`
export default Breadcrumb