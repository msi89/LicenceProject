import React from 'react'
import styled from 'styled-components'
import useBreadCrumb from '../../hooks/useBreadcrumb'
import useDrives from '../../store/actions/drives'

const Breadcrumb = () => {
    const { breadcrumbs, removeFromBreadCrumb, setBreadcrumb } = useBreadCrumb()
    const { getFolder, fetchCWD } = useDrives()

    const handleLoadRoot = async () => {
        await fetchCWD()
        setBreadcrumb([])
    }

    const handleClick = async (b) => {
        await getFolder(b.id)
        removeFromBreadCrumb(b)
    }

    return <Wrapper>
        <div class="flex breadcrumbs">
            <div class="breadcrumb" onClick={handleLoadRoot}>/</div>
            {breadcrumbs.map((bread, b) => <div className=" breadcrumb" key={b}
                onClick={() => handleClick(bread)}>
                {bread?.name}
            </div>)}
        </div>

    </Wrapper>
}
const Wrapper = styled.div`



.breadcrumb {
  display: inline-block;
  /* float: left; */
  position: relative;
  margin-top: 0.25em;
  margin-right: 0.5em;
  margin-bottom: 0.25em;
  padding: 0.5em;
  background-color: var(--main-color);
  color: #fff;
  white-space: nowrap;
  cursor: pointer;
}

.breadcrumb:after {
  content: "";
  position: absolute;
  top: 0;
  left: 100%;
  border-width: 1em 0.40em 1.2em 0.6em;
  border-style: solid;
  border-color: transparent transparent transparent var(--main-color);
}
.breadcrumb + .breadcrumb {
  margin-left: 0.50em;
}
.breadcrumb + .breadcrumb:before {
  content: "";
  position: absolute;
  top: 0;
  right: 100%;
  border-width: 1em 0.40em 1.2em 0.6em;
  border-style: solid;
  border-color: var(--main-color) var(--main-color) var(--main-color) transparent;
}

`
export default Breadcrumb