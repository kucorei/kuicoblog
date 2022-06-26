import axios from "./request"


export const page = (data,arg) => axios({
    url:"/api/page",
    method:"get",
    data:data,
    ...arg
})

export const pageContent = (data,arg) => axios({
    url:"/api/page",
    method:"post",
    data:data,
    ...arg
})
export const GetConfig = (arg) => axios({
    url:"/api/config",
    method:"get",
    ...arg
})
export const GetPageConfig = (arg) => axios({
    url:"/api/pageInfo",
    method:"get",
    ...arg
})
export default{}
