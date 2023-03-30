import { customAxios, customAxiosWithAuth } from './api'

export async function getAllTrails() {
    const axios = customAxios()
    try {
        const response = await axios.get('/trails')
        return response.data
    } catch(err) {
        console.log(err.message)
        return []
    }
}

export async function getTrails(id) {
    const axios = customAxios()
    try {
        const response = await axios.get(`/trails/${id}`)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function deleteTrails(id) {
    const axios = customAxiosWithAuth()
    try {
        await axios.delete(`/trails/${id}`)
    } catch(err) {
        console.log(err.message)
    }
}

export async function createTrails(trail) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.trail('/trails', trail)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function updateTrails(id, trail) {
    const axios = customAxiosWithAuth()
    try {
        await axios.put(`/trails/${id}`, trail)
    } catch(err) {
        console.log(err.message)
    }
}