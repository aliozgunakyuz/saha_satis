import axios from "axios";
import { useState, useEffect } from "react";
import { getMail } from '../helpFunc/helper.js';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export default function useFetch(queryOrMail) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: { name: '', surname: '', mail: '', phone: '', userType: '' },
    status: null,
    serverError: null
  });

  useEffect(() => {
    if (!queryOrMail) return;

    const fetchData = async () => {
      try {
        setData({ ...getData, isLoading: true });

        if (!queryOrMail.includes('/')) {
          // If it's not a query, consider it as mail
          const mail = queryOrMail;
          const encodedMail = encodeURIComponent(mail);
          const { data, status } = await axios.get(`/api/user/${encodedMail}`);
          setData({ ...getData, isLoading: false, apiData: data, status: status });
        } else {
          const { data, status } = await axios.get(`/api/${queryOrMail}`);
          setData({ ...getData, isLoading: false, apiData: data, status: status });
        }
      } catch (error) {
        setData({ ...getData, isLoading: false, serverError: error });
      }
    };

    fetchData();
  }, [queryOrMail]);

  return [getData, setData];
}
