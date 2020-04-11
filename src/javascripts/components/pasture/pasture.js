import cowData from '../../helpers/data/cowData';
import smashData from '../../helpers/data/smash';
import utils from '../../helpers/utils';
import cowComponent from '../cow/cow';
import newCowComponent from '../newCow/newCow';
import farmerCowData from '../../helpers/data/farmerCowData';
import editCow from '../editCow/editCow';

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

const editCowEvent = (e) => {
  e.preventDefault();
  const cowId = e.target.closest('.card').id;
  editCow.showForm(cowId);
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

const modifyCow = (e) => {
  e.preventDefault();
  const cowId = e.target.closest('.edit-cow-form-tag').id;
  const modifiedCow = {
    name: $('#edit-cow-name').val(),
    breed: $('#edit-cow-breed').val(),
    location: $('#edit-cow-location').val(),
    weight: $('#edit-cow-weight').val() * 1,
  };
  cowData.updateCow(cowId, modifiedCow)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildCows();
      utils.printToDom('edit-cow', '');
    })
    .catch((err) => console.error('could not update cow', err));
};

const farmerCowController = (e) => {
  e.preventDefault();
  // console.log(e.target.dataset);
  if (e.target.checked) {
    // create a new farmerCow
    const newFarmerCow = {
      cowId: e.target.closest('.card').id,
      farmerUid: e.target.dataset.farmerUid, // data-farmer-uid
    };
    farmerCowData.addFarmerCow(newFarmerCow)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        buildCows();
        utils.printToDom('new-cow', '');
        utils.printToDom('single-farmer', '');
      })
      .catch((err) => console.error('could not create farmer cow', err));
  } else {
    // delete a farmer cow
    const farmerCowId = e.target.id;
    farmerCowData.deleteFarmerCow(farmerCowId)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        buildCows();
        utils.printToDom('new-cow', '');
        utils.printToDom('single-farmer', '');
      })
      .catch((err) => console.error('could not delete farmer cow', err));
  }
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
      $('#show-add-cow-form').click(newCowComponent.showForm);
    })
    .catch((err) => console.error('get cows broke', err));
};

const pastureEvents = () => {
  $('body').on('click', '.delete-cow', removeCow);
  $('body').on('click', '.edit-cow', editCowEvent);
  $('body').on('click', '#cow-creator', makeACow);
  $('body').on('click', '#cow-modifier', modifyCow);
  $('body').on('click', '.farmer-cow-checkbox', farmerCowController);
};

export default { buildCows, pastureEvents };
