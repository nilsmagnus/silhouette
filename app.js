var app = angular.module('keyboardApp', []);

app.controller('guessController', ['$scope' ,

    function ($scope) {
        $scope.showInput = true;
        $scope.hideShowText = "Hide text";

        $scope.toggleShow = function () {
            if ($scope.showInput) {
                $scope.hideShowText = "Show text";
            } else {
                $scope.hideShowText = "Hide text";
            }
            $scope.showInput = !$scope.showInput;

        }

        $scope.specialUpperCases = "\u00D8\u00C6\u00C5";

        resolveClass = function (character) {


            if (!/^[a-zA-Z\u00D8\u00C6\u00C5\u00E5\u00F8\u00E6]+$/.test(character)) {
                return "nonLetter"
            }
            if (/^[A-Z\u00D8\u00C6\u00C5]+$/.test(character)) {
                return "letter upperCase"
            }
            if (/^[pgjy]+$/.test(character)) {
                return "letter lowLetter"
            }
            if (/^[khtlbd]+$/.test(character)) {
                return "letter highLetter"
            }
            if (/^[f]+$/.test(character)) {
                return "letter highLowLetter"
            }
            if (/^[a-z\u00E5\u00F8\u00E6]+$/.test(character)) {
                return "letter lowerCase"
            }
            return "none";
        }
        $scope.renderSentence = function () {
            var sentence = $scope.sentence;

            var blocked = document.getElementById("blocked");
            angular.element(blocked).empty();
            var blockHtml = '<div class="word">';

            for (var i = 0; i < sentence.length; i++) {
                var letter = sentence[i];
                var blockClass = resolveClass(letter);
                if (blockClass == "nonLetter") {
                    if (/(\r\n|\n|\r)/.test(letter)) {
                        console.log("lineshift")
                        blockHtml +="<br>";
                    }
                    else {
                        blockHtml +='</div><div class="word">';
                        blockHtml +="<span class='" + blockClass + "'>" + letter + "</span>";
                    }
                } else {
                    blockHtml += "<span class='" + blockClass + "'></span>";
                }
            }
            blockHtml +='</div>';
            angular.element(blocked).append(blockHtml);

        };
    }
]);

 
