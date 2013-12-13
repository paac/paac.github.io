angular.module('estimator.service', []).
  factory('Vendors', function () {
    var vendors = [
      {name: 'Pep Boys'},
      {name: 'Prime'},
      {name: 'Quality'},
      {name: 'Bap Geon'},
      {name: 'API'},
      {name: 'American Tire', matrix: 'tire'},
      {name: 'Atlantic Tire', matrix: 'tire'},
      {name: 'Checkered Flag', matrix: 'dealer'},
      {name: 'Colonial', matrix: 'dealer'},
      {name: 'Interstate Battery', manualSale: true},
      {name: 'LKQ'},
      {name: 'Perry', matrix: 'dealer'},
      {name: 'Priority', matrix: 'dealer'},
      {name: 'Southern', matrix: 'dealer'}
    ];
    return vendors;
  });