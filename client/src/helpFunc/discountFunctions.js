import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function addDiscount(credentials){
    try {
        const {data:{msg},status} =  await axios.post('/api/adddiscount', credentials)

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({error})
    }
}

export async function getDiscounts() {
    try {
      const response = await axios.get('/api/getdiscounts');
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }