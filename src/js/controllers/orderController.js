import axios from 'axios'
import { routes } from './../utils/Variables'

const { addOrderLink } = routes

export const addOrder = async cart => {
  try {
    const data = {
      cart,
    }
    const res = await axios.post(addOrderLink, data)
    return {
      data: res.data.data.data,
      status: res.status,
    }
  } catch (error) {
    console.log(error)
  }
}
