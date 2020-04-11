import utils from '../../helpers/utils';

const showForm = () => {
  const domString = 'edit cow';
  utils.printToDom('edit-cow', domString);
};

export default { showForm };
