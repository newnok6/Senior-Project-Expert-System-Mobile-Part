'use strict';

describe('Drug Expert System Test Suite',function(){
  var $scope,ctrl;
  var substanceServiceMock;

 
 beforeEach(module('drugExpertSystem.substanceController'));
  //beforeEach(module('drugExpertSystem.services'));

  beforeEach(function (){
  	substanceServiceMock = jasmine.createSpyObj('substanceService',['getSubstanceList']);
  	inject(function($rootScope, $controller,$http) {
  		$scope = $rootScope.$new();

      //$state = $injector.get('$state');
  		substanceServiceMock.getSubstanceList.andReturn('gg');
  		ctrl = $controller('substanceCtrl',{
  			$scope : $scope,
  			substanceService : substanceServiceMock
  		});
  	});
  });


  it('should return the list of substance data when $scope.getSubstance() is call', function(){
  	$scope.getSubstanceList();

  	expect(substanceServiceMock.getSubstanceList).toHaveBeenCalled();
    console.log($scope.test);
  	expect($scope.substances).toEqual('gg');
    console.log($scope.substances);
   //console.log(substanceServiceMock.getSubstanceList);
    //console.log($scope.testdata);
  });


/*
  beforeEach(module("drugExpertSystem.substanceController", function($provide){
    substanceService = jasmine.createSpyObj("substanceService",["getSubstanceList"]);
    substanceService.getSubstanceList.andReturn({
      name : "substance A"
    });

    $provide.value('substanceService', substanceService);

  }));

  beforeEach(inject(function($controller,$rootScope,substanceService){
      $scope = $rootScope.$new();
      substanceService = substanceService;

      $controller = $controller("substanceCtrl",{
        $scope: $scope,
        substanceService : substanceService
      });
  }));

  it("Should  have the the $scope.getSubstanceList in the Controller", function(){
      expect($scope.getSubstanceList).toBeDefined();
  });

  it('should return the list of substance data when $scope.getSubstance() is call', function(){
    //$scope.getSubstanceList();

    expect(substanceService.getSubstanceList).toHaveBeenCalled();
    //console.log(substanceServiceMock.getSubstanceList);
    //expect($scope.substances).toEqual('gg');
    //console.log($scope.substances);
    //console.log($scope.testdata);
  });

*/
});