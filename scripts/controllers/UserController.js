myApp.controller('userCtrl', function ($scope, $rootScope, userService) {
    $scope.user = {};
    $scope.user.firstName = userService.getName();
    $scope.user.lastName = "Doe";
    $scope.user.fullName = function () {
        return $scope.user.firstName + " " + $scope.user.lastName;
    };

    $scope.userList = [];
    if ($rootScope.ruserList != undefined) {
        $scope.userList = $rootScope.ruserList;
    }
    
    $scope.create = function () {
        var newUser = $scope.user.fullName();
        $scope.userList.push(newUser);
        
            $rootScope.ruserList = $scope.userList;
       
        
    };
});

myApp.controller('listCtrl', function ($scope, $rootScope) {
   
    $scope.userList = $rootScope.ruserList;
   
});