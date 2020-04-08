import cowData from '../../helpers/data/cowData';
import smashData from '../../helpers/data/smash';
import utils from '../../helpers/utils';
import cowComponent from '../cow/cow';
import newCowComponent from '../newCow/newCow';

const removeCow = (e) => {
  const cowId = e.target.closest('.card').id;
  smashData.completelyRemoveCow(cowId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildCows();
      utils.printToDom('single-farmer', '');
    })
    .catch((err) => console.error('could not delete cow', err));
};

const makeACow = (e) => {
  e.preventDefault();
  // 1. make a new cow object
  const newCow = {
    name: $('#cow-name').val(),
    breed: $('#cow-breed').val(),
    location: $('#cow-location').val(),
    weight: $('#cow-weight').val() * 1,
  };
  // 2. save to firebase
  cowData.addCow(newCow)
    .then(() => {
      // 3. reprint cows
      // eslint-disable-next-line no-use-before-define
      buildCows();
      utils.printToDom('new-cow', '');
    })
    .catch((err) => console.error('could not add cow', err));
};

// 1. make smash function called getCowsWithOwners
// 2. move cowData.getCows into that smash function - nothing should look different
// 3. in smash function - getFarmerCows, getAllFarmers
// 4. smash function to return an array of cow objects- each cow object should have an
// array of farmers.  Each farmer should have a boolean isChecked (true if that farmer owns that cow)
// 5.  modify domstring to show checkboxes
// 6.  when a checkbox is checked - POST to farmerCows collection
// 7.  when a checkbox is unchecked - DELETE to farmerCows collection

const buildCows = () => {
  smashData.getCowsWithOwners()
    .then((cows) => {
      let domString = '';
      domString += '<h2 class="text-center">Pasture</h2>';
      domString += '<button class="btn btn-success" id="show-add-cow-form"><i class="fas fa-plus"></i></button>';
      domString += '<div class="d-flex flex-wrap">';
      cows.forEach((cow) => {
        domString += cowComponent.cowMaker(cow);
      });
      domString += '</div>';
      utils.printToDom('pasture', domString);
      $('body').on('click', '.delete-cow', removeCow);
      $('body').on('click', '#cow-creator', makeACow);
      $('#show-add-cow-form').click(newCowComponent.showForm);
    })
    .catch((err) => console.error('get cows broke', err));
};

export default { buildCows };
