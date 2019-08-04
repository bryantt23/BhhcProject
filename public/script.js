
    angular.module('myApp', []).controller('reasonsCtrl', function ($scope, $http) {
        $scope.reasons = [];
        $scope.reasonsToDelete = [];
        
        $scope.toggleSelection = function (reason) {
            let index=$scope.reasonsToDelete.indexOf(reason);
            if(index>-1){
                $scope.reasonsToDelete.splice(index, 1);
            }
            else{
                $scope.reasonsToDelete.push(reason);
            }
            console.log($scope.reasonsToDelete);
        }
        
        $scope.deleteReasons = function () {
            // alert($scope.reasonToAdd)
            // $scope.reasons.push($scope.reasonToAdd);

            console.log($scope.reasons.filter(reason=>$scope.reasonsToDelete.indexOf(reason)===-1));

            $scope.reasons=$scope.reasons.filter(reason=>$scope.reasonsToDelete.indexOf(reason)===-1);
            testPosting();
        }

        $scope.addReason = function () {
            // alert($scope.reasonToAdd)
            $scope.reasons.push($scope.reasonToAdd);

            testPosting();
        }

        var testPosting = function () {
            $http.post("data", $scope.reasons).
                then(function (response) {
                    console.log("posted successfully");
                }).catch(function (response) {
                    console.error("error in posting");
                })
        }

        //https://www.w3schools.com/angular/angular_http.asp
        var getReasons = function () {
            $http.get("data").then(function mySuccess(response) {
                $scope.reasons = response.data.reasons;
                // debugger;
            }, function myError(response) {
                $scope.reasons = response.statusText;
            });
        }
        getReasons();
    });