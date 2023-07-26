import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function addClient(credentials){
    try {
        const {data:{msg},status} =  await axios.post('/api/addclient', credentials)

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({error})
    }
}

export async function getClients() {
    try {
      const response = await axios.get('/api/getclients');
  
      // Assuming the response data is an array of products, you can directly return it
      return Promise.resolve(response.data);
    } catch (error) {
      // If there's an error, reject the Promise with the error object
      return Promise.reject(error);
    }
  }