import axios from 'axios'

const API = axios.create({
    baseURL: '/api'
})

export const getVehicleTypes = async (wheels) => {
    const res = await API.get(`/vehicle-types?wheels=${wheels}`)
    return res.data
}

export const getVehicles = async (typeId) => {
    const res = await API.get(`/vehicles?typeId=${typeId}`)
    return res.data
}

export const createBooking = async (data) => {
    const res = await API.post('/bookings', data)
    return res.data
}
export const getBookingById = async (id) => {
    const res = await API.get(`/bookings/${id}`);
    return res.data;
};