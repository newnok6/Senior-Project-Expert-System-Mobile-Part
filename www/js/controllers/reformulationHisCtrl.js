'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.reformulationHistoryController', [])
    // Reformulation Controller//
    .controller('reformulationHisCtrl', function($scope, $timeout, $state, $ionicModal, $ionicPopup, $ionicSlideBoxDelegate, $ionicPopover, $ionicLoading, $ionicViewService, reformulationService, reformulationHistoryService) {

        $scope.reformulationHistoryList = {};

        // Selected History From the List of Reformulation History //
        $scope.selectedHistory = {};
        $scope.orginalSelectedHistory = angular.copy($scope.selectedHistory);
        $scope.currentReformulatedProduction = {};

        //Get Reformulation History List from the database //
        reformulationHistoryService.getReformulationHistoryList().success(function(response) {
            $scope.reformulationHistoryList = response;
            console.log($scope.reformulationHistoryList);
        });

        $scope.getReformulationHistory = function() {
            reformulationHistoryService.getReformulationHistoryList().success(function(response) {
                $scope.reformulationHistoryList = response;
                console.log($scope.reformulationHistoryList);
            });
        }



        $scope.setSelectedHistory = function(history) {
            $scope.selectedHistory = history;
            $scope.currentReformulatedProduction = $scope.selectedHistory.reformulatedProductionList[0];
            $state.go("base.reformulationHistoryContent.reformulationHistoryDetail");

        }


        // Set Current Reformulated Product follow the tab that user selected //
        $scope.resultSection = "ruleBase";

        //Set Reformulation Result that user selected//
        $scope.setReformulateResult = function(section) {
            $scope.resultSection = section;
            if (section == "ruleBase") {
                $scope.currentReformulatedProduction = $scope.selectedHistory.reformulatedProductionList[0];
            } else if (section == "caseBase") {
                $scope.currentReformulatedProduction = $scope.selectedHistory.reformulatedProductionList[1];
            } else if (section == "hybrid") {
                $scope.currentReformulatedProduction = $scope.selectedHistory.reformulatedProductionList[2];
            }

        };

        //Reformulation History Option such as "delete history" and "evaluation"//
        $ionicPopover.fromTemplateUrl('reformulationHistoryOption.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function($event) {
            document.body.classList.add('platform-ios');
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };


        //Evaluate the reformulation history//
        $scope.evaluation = function() {

        }

        // Delete the selected reformulation history from the database //
        $scope.deleteHistory = function() {
            $scope.closePopover();
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete The Reformulation History',
                template: 'Are you sure you want to delete this reformulation history ?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    reformulationHistoryService.deleteReformulationHistory($scope.selectedHistory.id);
                    $scope.reset();
                    $ionicLoading.show({
                        template: '<i class="icon ion-loading-c"></i>',
                        showDelay: 5 // If the delay is too fast and you also change states, while the loader is showing, you can get flashing behavior
                    });

                    // Hide the loadingIndicator 1500 ms later
                    $timeout(function() {
                        $ionicLoading.hide();
                    }, 1500);

                    // 500 ms after showing the loadingIndicator, do a state change.  The idea is that when the loader is hidden, you will be in the new state.  But as you'll see there is flashing.
                    $timeout(function() {
                        $state.go('base.reformulationHistoryContent.reformulationHistorySelection');
                    }, 500);
                } else {
                    console.log('You are not sure');
                }
            });
        };

        // refresh the reformulation history data//
        $scope.doRefresh = function() {
            $timeout(function() {
                $scope.getReformulationHistory;

                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);

        };

        // Reset the data that showm on page //
        $scope.reset = function() {
                $scope.selectedHistory = angular.copy($scope.orginalSelectedHistory);
            }
            // Back to previous page //
        $scope.back = function() {
            var history = $ionicViewService.getBackView();
            history.go();
        }

    });
