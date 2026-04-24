import axios from "axios"

const baseURL = import.meta.env.VITE_API_BASE_URL?.trim() || ""
const apiKey = import.meta.env.VITE_API_KEY?.trim()

export const apiClient = axios.create({
  baseURL,
  headers: apiKey
    ? {
        "x-api-key": apiKey
      }
    : undefined
})
