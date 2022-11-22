import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_SPACE_X_API_URL,
})
