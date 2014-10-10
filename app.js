var app = angular.module('keyboardApp', []);

app.controller('guessController', ['$scope' ,
    
    function ($scope ) {
        $scope.showInput = true;
        $scope.hideShowText = "Hide text";

        $scope.toggleShow = function(){
            if($scope.showInput){
                $scope.hideShowText = "Show text";
            } else{
                $scope.hideShowText = "Hide text";
            }
            $scope.showInput = !$scope.showInput;
            
        }

        resolveClass = function(character){

            if(!/^[a-zA-Z]+$/.test(character)){
                return "nonLetter"
            }
            if(/^[A-Z]+$/.test(character)){
                return "letter upperCase"
            }
            if(/^[pgjy]+$/.test(character)){
                return "letter lowLetter"
            }
            if(/^[khtlbd]+$/.test(character)){
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
                    if(/(\r\n|\n|\r)/.test(letter)){
                        console.log("lineshift")
                        angular.element(blocked).append("<br>");
                    }
                    else {
                        angular.element(blocked).append("<span class='"+blockClass+"'>"+letter+"</span>");
                    }
                }else{
                    angular.element(blocked).append("<span class='"+blockClass+"'></span>");
                }
            }
        };
    }
]);

 
