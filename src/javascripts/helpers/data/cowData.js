import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getCows = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/cows.json`)
    .then((response) => {
      const demCows = response.data;
      const cows = [];
      if (demCows) {
        Object.keys(demCows).forEach((cowId) => {
          demCows[cowId].id = cowId;
          cows.push(demCows[cowId]);
        });
      }

      resolve(cows);
    })
    .catch((err) => reject(err));
});

const deleteCow = (cowId) => axios.delete(`${baseUrl}/cows/${cowId}.json`);

const addCow = (newCow) => axios.post(`${baseUrl}/cows.json`, newCow);

export default { getCows, deleteCow, addCow };
