myApp.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "views/user/alluser.html",
        controller: "listCtrl"
    })
    .when("/allusers", {
        templateUrl: "views/user/alluser.html",
        controller: "listCtrl"
    })
    .when("/create", {
        templateUrl: "views/user/create.html",
        controller: "userCtrl"
    }).otherwise({
        template: "<h1>None</h1><p>Nothing has been selected,</p>"
    });
});