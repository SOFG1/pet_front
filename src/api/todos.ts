import axios from "axios"
import { baseUrl } from "."


export const Planets = {
    getAllPlanets: async  () => {
        return await axios.get(`${baseUrl}/planets/`)
    },
}