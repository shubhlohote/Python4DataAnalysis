/**
 * Created by manog on 13-10-2016.
 */

(function() {
    angular
        .module('WebAppMaker')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl: "views/admin/user-list.view.client.html",
               resolve:{
                    checkAdmin:checkAdmin
               }
            })

            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    checkLogin: checkLogin
                }
            })

            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    checkLogin: checkLogin
                }
            })

            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller:"WebsiteNewController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "WebsiteEditController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page",{
                templateUrl:"views/page/page-list.view.client.html",
                controller:"PageListController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/new",{
                templateUrl:"views/page/page-new.view.client.html",
                controller:"PageNewController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid",{
                templateUrl:"views/page/page-edit.view.client.html",
                controller:"PageEditController",
                controllerAs:"model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateUrl:"views/widget/widget-chooser.view.client.html",
                controller:"WidgetChooserController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "WidgetEditController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo: "/login"
            });

        function checkLogin($q,UserService, $location){
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(
                    function(user) {
                        if (user!='0') {
                            deferred.resolve();
                        }
                        else {
                            console.log("check login else");
                            deferred.reject();
                            $location.url("/login");
                        }
                    }

                );
            return deferred.promise;
        }


        function checkAdmin($q,UserService, $location){
            var deferred = $q.defer();
            UserService
                .checkAdmin()
                .success(
                    function(user) {
                        if (user!='0') {
                            deferred.resolve();
                        }
                        else {
                            console.log("check login else");
                            deferred.reject();
                            $location.url("/login");
                        }
                    }

                );
            return deferred.promise;
        }

    }
})();