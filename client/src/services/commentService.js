import { customAxiosWithAuth } from './api'
// import axios from 'axios'

export async function deleteComment(commentId, trailId) {
    const axios = customAxiosWithAuth()
    try {
        await axios.delete(`/comments/p/${trailId}/c/${commentId}`)
    } catch(err) {
        console.log(err.message)
    }
}

export async function createComment(comment, trailId) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.post(`/comments/trail/${trailId}`, comment)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function getComment(commentId, trailId) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.get(`/comments/p/${trailId}/c/${commentId}`)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function updateComment(comment, commentId, trailId) {
    const axios = customAxiosWithAuth()
    try {
        await axios.put(`/comments/p/${trailId}/c/${commentId}`, comment)
    } catch(err) {
        console.log(err.message)
    }
}