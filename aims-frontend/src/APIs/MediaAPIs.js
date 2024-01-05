import { api } from "./APIs"

export const getAllMediaAPI = () => {
    return api("GET", "medias/getAll", null)
}