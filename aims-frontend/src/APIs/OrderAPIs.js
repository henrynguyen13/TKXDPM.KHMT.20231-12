import { api } from "./APIs"

export const getAllOrdersAPIs = ()=>{
    return api("GET","orders",null)
}