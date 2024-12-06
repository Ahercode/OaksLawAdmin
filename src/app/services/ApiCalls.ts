import axios from "axios";


export const  BaseUrl = import.meta.env.VITE_BASE_URL;
export const  companyName = import.meta.env.VITE_COMPANY_NAME;
export const cacheTime = 600000;


//dynamic fetch function
export function fetchData(url: string) {
    return axios.get(`${BaseUrl}/${url}`)
}

//dynamic update function
export function updateItem(item: any) {
    return axios.put(`${BaseUrl}/${item.url}/${item.data.id}`, item.data)
}

// dynamic patch function
export function patchItem(item: any) {
    return axios.patch(`${BaseUrl}/${item.url}/${item.id}`, item.data)
}

//dynamic delete function
export function deleteItem(item: any) {
    return axios.delete(`${BaseUrl}/${item.url}/${item.data.id}`)
}

//dynamic post function
export function postItem(item: any) {
    return axios.post(`${BaseUrl}/${item.url}`, item.data)
}

export function sendEmail(item: any) {
    return axios.post(`${BaseUrl}/${item.url}`, item.data)
}