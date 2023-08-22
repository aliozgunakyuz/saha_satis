import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function addProduct(credentials){
    try {
      
        const {data:{msg},status} =  await axios.post('/api/addproduct', credentials)

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({error})
    }
}

export async function getProducts() {
    try {
      const response = await axios.get('/api/getproducts');
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }