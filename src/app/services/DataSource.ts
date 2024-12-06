import {useQuery} from "react-query";
import {BaseUrl, cacheTime, fetchData} from "./ApiCalls.ts";




export const useFetchData = () =>{

    const { data: allPurchaseOrder, isLoading: loadingPOs } = useQuery('purchaseorders', () => fetchData(`${BaseUrl}/PurchaseOrder`), { cacheTime: cacheTime })
    const { data: allSageModules, isLoading: loadingSM } = useQuery('sageModules', () => fetchData(`${BaseUrl}/SageModules`), { cacheTime: cacheTime })
    const { data: allSageModuleUsers, isLoading: loadSMU } = useQuery('sageModuleUsers', () => fetchData(`${BaseUrl}/SageModuleUsers`), { cacheTime: cacheTime })
    const { data: allSageUsers, isLoading:loadingSU } = useQuery('sageUsers', () => fetchData(`${BaseUrl}/SageUsers`), { cacheTime: cacheTime })
    const {data: allStaffs, isLoading: loadingStaffs} = useQuery('staffs', () => fetchData(`${BaseUrl}/Staffs`), { cacheTime: cacheTime })
    const {data: allAttendance, isLoading: loadingAttendance} = useQuery('attendances', () => fetchData(`${BaseUrl}/AttendanceHistories`), { cacheTime: cacheTime })


    return {
        allPurchaseOrder,
        allSageModules,
        allSageModuleUsers,
        allSageUsers,
        loadSMU,
        loadingPOs,
        loadingSM,
        loadingSU,
        allStaffs,
        loadingStaffs,
        allAttendance,
        loadingAttendance

    }
}