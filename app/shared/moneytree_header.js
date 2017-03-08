    app.controller('HeaderController', ['$scope', 'HeaderService', function($scope, headerService) {
        this.userData = headerService.getData();
        this.name = this.userData[0].uname;
        //this.notification = this.userData.notification;
        console.log(this.userData);

    }]);
    app.component('headerComponent', {
        bindings: {

            //notification: "="
        },
        controller: 'HeaderController',
        template: `
            <div class="row header_class  col-xs-12">
                <img class="header_img col-xs-12 col-sm-4" src="../image/moneytree.png" alt="moneytree logo" height="125px">
                <div class="dropdown col-sm-4" id="headerSearch">
                    <search-component></search-component>
                </div>
                <div class="header_buttons_group btn-group hidden-xs col-md-4 col-sm-4 pull-right">

                    <button class="button_header btn btn-primary col-sm-4 col-md-4" type="button">{{$ctrl.name}}</button>

                    <button class="button_header btn btn-primary col-sm-4 col-md-4" type="button">Notification <span class="caret"></span></button>
                    <button class="button_header btn btn-primary col-sm-4 col-md-4" type="button" ng-click="$ctrl.signOut()">Sign Out</button>
                </div>
            </div>
        `
    })
    app.service('HeaderService', ['$http', function($http) {
        var mockData = [
            { uname: 'anshul', notification: 'yes' },
        ];
        this.getData = function() {
            return mockData;
        }
    }]);