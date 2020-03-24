const farmMaker = (farmer) => {
  let domString = '';
  domString += '<div class="col-3">';
  domString += '<div class="card">';
  domString += `<div class="card-header">${farmer.name}</div>`;
  domString += '<div class="card-body">';
  domString += `<p class="card-text">Age: ${farmer.age}</p>`;
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { farmMaker };
