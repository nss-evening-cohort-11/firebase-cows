import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getFarmerCowsByFarmerUid = (uid) => new Promise((resolve, reject) => {
  // axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
  // axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
  axios.get(`${baseUrl}/farmerCows.json?orderBy="farmerUid"&equalTo="${uid}"`)
    .then((response) => {
      const demFarmerCows = response.data;
      const farmerCows = [];
      // ['farmerCow1', 'farmerCow2'].forEach()
      Object.keys(demFarmerCows).forEach((farmerCowId) => {
        demFarmerCows[farmerCowId].id = farmerCowId;
        farmerCows.push(demFarmerCows[farmerCowId]);
      });
      resolve(farmerCows);
    })
    .catch((err) => reject(err));
});


const getFarmerCowsByCowId = (cowId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/farmerCows.json?orderBy="cowId"&equalTo="${cowId}"`)
    .then((response) => {
      const demFarmerCows = response.data;
      const farmerCows = [];
      Object.keys(demFarmerCows).forEach((farmerCowId) => {
        demFarmerCows[farmerCowId].id = farmerCowId;
        farmerCows.push(demFarmerCows[farmerCowId]);
      });
      resolve(farmerCows);
    })
    .catch((err) => reject(err));
});

const getFarmerCows = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/farmerCows.json`)
    .then((response) => {
      const demFarmerCows = response.data;
      const farmerCows = [];
      Object.keys(demFarmerCows).forEach((farmerCowId) => {
        demFarmerCows[farmerCowId].id = farmerCowId;
        farmerCows.push(demFarmerCows[farmerCowId]);
      });
      resolve(farmerCows);
    })
    .catch((err) => reject(err));
});

const deleteFarmerCow = (fCowId) => axios.delete(`${baseUrl}/farmerCows/${fCowId}.json`);

const addFarmerCow = (newFarmerCow) => axios.post(`${baseUrl}/farmerCows.json`, newFarmerCow);

export default {
  getFarmerCowsByFarmerUid,
  getFarmerCowsByCowId,
  deleteFarmerCow,
  getFarmerCows,
  addFarmerCow,
};
