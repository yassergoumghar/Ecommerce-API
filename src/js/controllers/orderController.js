import axios from 'axios';
import { routes } from './../utils/Variables';

const { addOrderLink } = routes;

export const addOrder = async (cart) => {
  try {
    const data = {
      cart,
    };
    const res = await axios.post(addOrderLink, data);
    return res.data.data.data;
  } catch (error) {
    console.log(error);
  }
};
