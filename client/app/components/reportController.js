app.controller('ReportController', ['$scope', 'ReportHeader', 'Report', 'Partner', '$http', function ($scope, ReportHeader, Report, Partner, $http) {
  $scope.loading = true;

  $scope.gridOptions = {
    showGridFooter: true,
    showColumnFooter: true,
    enableFiltering: true,
    paginationPageSizes: [50, 50, 75],
    paginationPageSize: 50,
    enableGridMenu: true,
    enableSelectAll: true,
    exporterCsvFilename: 'myFile.csv',
    exporterPdfDefaultStyle: {fontSize: 9},
    exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'black'},
    exporterPdfHeader: { text: 'KEMSA Customer Aging', style: 'headerStyle' },
    exporterPdfFooter: function ( currentPage, pageCount ) {
      return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    },
    exporterPdfCustomFormatter: function ( docDefinition ) {
      docDefinition.styles.headerStyle = { fontSize: 16, bold: true };
      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      return docDefinition;
    },
    exporterPdfOrientation: 'landscape',
    exporterPdfPageSize: 'A3',
    exporterPdfMaxGridWidth: 500,
    exporterCsvLinkElement: angular.element(document.querySelectorAll('.custom-csv-link-location')),
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };

  angular.element('#loader').show();
  $scope.reportHeader = ReportHeader.getNames({reportHeaderId:1000001});
  $scope.report = Report.findById({id:1000000});
  
  $scope.gridOptions.data = Partner.customerAging();
  angular.element('#loader').hide();
  
}]);

app.controller('ReportListController', ['$scope', '$http', '$uibModal', 'Report', function ($scope, $http, $uibModal, Report) {

  $scope.reports = Report.find();
  $scope.animationsEnabled = true;

  $scope.open = function(report, $uibModel){
    if(report.hasparams == 'Y'){

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/partials/modals.html',
          controller: 'ModalInstanceCtrl',
          resolve: {
            bodyContent: function () {
              return report.description;
            },
            bodyTitle: function () {
              return report.name;
            }
          }
        });
    
        modalInstance.result.then(function (bodyContent) {
          $scope.bodyContent = bodyContent;
        }, function () {});

    }
  }

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

}]);

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, bodyContent, bodyTitle) {

  $scope.bodyContent = bodyContent;
  $scope.bodyTitle = bodyTitle;

  $scope.ok = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
