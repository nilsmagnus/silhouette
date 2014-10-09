var soapApp = angular.module('soapApp', []);

soapApp.controller('guessController', ['$scope' ,
    
    function ($scope ) {
    	$scope.renderSentence = function(){
    		var sentence = $scope.sentence;
    		console.log(sentence);
    	};
    }
]);