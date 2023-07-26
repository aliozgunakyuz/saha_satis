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