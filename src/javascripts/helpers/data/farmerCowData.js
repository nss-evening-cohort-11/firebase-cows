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

export default { getFarmerCowsByFarmerUid };
