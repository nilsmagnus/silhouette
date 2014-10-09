var keyboardApp = angular.module('keyboardApp', []);

keyboardApp.controller('guessController', ['$scope' ,
    
    function ($scope ) {
    	resolveClass = function(character){
    		if(!/^[a-zA-Z]+$/.test(character)){
    			return "nonLetter"
    		}
    		if(/^[A-Z]+$/.test(character)){
    			return "letter upperCase"
    		}
    		if(/^[gjy]+$/.test(character)){
    			return "letter lowLetter"
    		}
    		if(/^[khtlbdå]+$/.test(character)){
    			return "letter highLetter"
    		}    		
    		if(/^[f]+$/.test(character)){
    			return "letter highLowLetter"
    		}
    		if(/^[a-z]+$/.test(character)){
    			return "letter lowerCase"
    		}
    		return "none";
    	}
    	$scope.renderSentence = function(){
    		var sentence = $scope.sentence;
	    	
	    	var blocked = document.getElementById("blocked");
	    	angular.element(blocked).empty();
    		for(var i =0;i<sentence.length; i++){
    			var letter = sentence[i];
	    		var blockClass = resolveClass(letter);
	    		if(blockClass == "nonLetter"){
	    			angular.element(blocked).append("<span class='"+blockClass+"'>"+sentence[i]+"</span>");
	    		}else{
		    		angular.element(blocked).append("<span class='"+blockClass+"'></span>");
	    		}
    		}
    	};
    }
]);

 
