import axios from "axios"


const server = axios.create({
    baseURL:"/",
    timeout: 5000,
    withCredentials: true,
    crossDomain: true
})

server.defaults.withCredentials = true
server.interceptors.request.use(
    config=>{

        return config
    }
)

server.interceptors.response.use(
    response => {
        if(response.status===200){
            return response.data
        }
        return {}
    }
)

export default server
