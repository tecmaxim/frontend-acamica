import axios from "axios"
// Endpoint external API
const BASE_URL = process.env.REACT_APP_API_URL
// Create object to make api request.
const API = axios.create({
    baseURL:BASE_URL
})

export default API