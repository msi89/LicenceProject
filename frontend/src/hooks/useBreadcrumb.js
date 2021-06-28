import { useRecoilState } from "recoil"
import { breadcrumbState } from "../store"


export const useBreadCrumb = () => {
    const [breadcrumbs, setBreadcrumb] = useRecoilState(breadcrumbState)

    function addToBreadCrumb(folder) {
        if (breadcrumbs.findIndex(c => c?.id === folder?.id) === -1 && folder?.name !== '/') {
            const bcb = [...breadcrumbs]
            bcb.push({
                id: folder?.id,
                name: folder?.name
            })
            setBreadcrumb(bcb)
        }
    }

    function removeFromBreadCrumb(folder) {
        const index = breadcrumbs.findIndex(c => c?.id === folder?.id)
        if (index !== -1) {
            const ps = breadcrumbs.slice(0, index + 1)
            setBreadcrumb(ps)
        }
    }

    return {
        addToBreadCrumb,
        removeFromBreadCrumb,
        breadcrumbs,
        setBreadcrumb
    }
}

export default useBreadCrumb