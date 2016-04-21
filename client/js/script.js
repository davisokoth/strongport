var app = angular.module('myModule', ['ngRoute', 'ngResource', 'ngTouch', 'lbServices', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.bootstrap']);

app.config(function($routeProvider) {
  $routeProvider

    // route for the home page
    .when('/customeraging', {
        templateUrl : 'views/agingView.html',
        controller : 'ReportController'
    })

    // route for the about page
    .when('/about', {
        controller : 'aboutController'
    })

    // route for the contact page
    .when('/contact', {
        controller : 'contactController'
    });
});

app.directive('ngConfirm', ['$uibModal', function ($uibModal) {
        return {
            restrict: 'A',
            scope: {
                ngConfirmMessage: '@',
                ngConfirm: '&'
            },
            link: function (scope, element) {
                element.bind('click', function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'app/partials/modals.html',
                        size: 'sm',
                        windowClass: 'confirm-window',
                        resolve: {
                            confirmClick: function () {
                                return scope.ngConfirm;
                            },
                            confirmMessge: function () {
                                return scope.ngConfirmMessage;
                            }
                        }
                    });
                });
            }
        }
    }])
        .controller('ModalConfirmCtrl', ['$scope', '$uibModalInstance', 'confirmClick',
            function ($scope, $uibModalInstance, confirmClick) {
                $scope.confirmMessage = confirmMessge;
                function closeModal() {
                    $uibModalInstance.dismiss('cancel');
                }

                $scope.ok = function () {
                    confirmClick();
                    closeModal();
                }

                $scope.cancel = function () {
                    closeModal();
                }
            }]);

