import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const getConfig = () => ({
    headers: { Authorization: token }
})

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const destroyToken = () => {
    token = null
}

const getAll = () => {
    console.log(baseUrl)
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (newObject, token) => {
    setToken(token)
    const response = await axios.post(baseUrl, newObject, getConfig())
    return response.data
}

const update = async (newObject, token) => {
    setToken(token)
    const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, getConfig())
    return response.data
}

const remove = async (object, token) => {
    setToken(token)
    const response = await axios.delete(`${baseUrl}/${object.id}`, getConfig())
    return response.data
}

export default { getAll, create, update, remove, setToken, destroyToken }