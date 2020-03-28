import firebase from 'firebase/app';
import 'firebase/auth';

import farmerData from '../../helpers/data/farmerData';
import farmerComponent from '../farmer/farmer';
import singleFarmer from '../singleFarmer/singleFarmer';
import utils from '../../helpers/utils';


const getCurrentUid = () => {
  const myUid = firebase.auth().currentUser.uid;
  console.error(myUid);
  boardData.getBoardsByUid(myUid).then().catch();
};

const buildFarmers = () => {
  farmerData.getFarmers()
    .then((farmers) => {
      let domString = '';
      domString += '<h2 class="text-center">Farmhouse</h2>';
      domString += '<div class="d-flex flex-wrap">';
      farmers.forEach((farmer) => {
        domString += farmerComponent.farmMaker(farmer);
      });
      domString += '</div>';
      domString += '<button class="btn btn-danger" id="get-uid">get UID</button>';
      utils.printToDom('farmhouse', domString);
      $('body').on('click', '.farmer-card', singleFarmer.buildFarmer);
      $('#get-uid').click(getCurrentUid);
    })
    .catch((err) => console.error('problem with getFarmers', err));
};

export default { buildFarmers };
