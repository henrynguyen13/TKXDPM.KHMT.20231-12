import { api } from "./APIs"

export const getInvoiceById = (id)=>{
    return api("GET",`orders/${id}`,null)
}