import axios from 'axios'
const URL = '/api/persons'

const getAll = () => {
    const request = axios.get(URL)
    return request.then(response => response.data)
}

const create = (newObj) => {
    const request = axios.post(URL, newObj)
    return request.then(response => response.data)
}

const update = (id, newObj) => {
    const request = axios.put(`${URL}/${id}`, newObj)
    return request.then(response => response.data)
}

const deletePersonById = (id) => {
    const request = axios.delete(`${URL}/${id}`)
    return request.then(response => response.data)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    deletePersonById: deletePersonById
}