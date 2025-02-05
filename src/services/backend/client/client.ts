import axios from 'axios';
// import { LEARNING_BACKEND_URL } from '../learnings/constants';

// const instance = axios.create({
//   baseURL: LEARNING_BACKEND_URL,
// });

export const GetRequest = async (url: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
