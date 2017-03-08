//var app = angular.module('sapp', []);

/*  .controller('SearchController', ['$scope', 'StockService', function ($scope, stockService) {
        //$scope.searchStock = "TCS";
        //this.searchStock = "t";
        
            this.stocks = [];
            stockService.getStock(this.searchStock).then(function (response) {
                this.stocks = response.data;
            });
            console.log(this.searchStock);
            this.stocknames = [];
            for (var i = 0; i < this.stocks.length; i++) {
                this.stocknames[i] = this.stocks[i].name;
            }
    }])
*/
/*
app.component('searchComponent', {
    controller: ['StockService', function(stockService) {
        //$scope.searchStock = "TCS";
        //this.searchStock = "t";
        this.stocks = [];
        this.stocknames = [];
        var self = this;
        this.getData = function(data) {
            console.log("Inside getData fn");
            var x = stockService.getStock(data);
            console.log("X : " + x);
            x.then(function(response) {
                self.stocks = [];
                self.stocknames = [];
                self.stocks = response.data.stock;

                console.log(self.stocks);
                for (var i = 0; i < self.stocks.length; i++) {
                    self.stocknames[i] = self.stocks[i].stock_name;
                }

            });

        };

    }],
    template: `
        
        <input class="form-control header_search  col-sm-12 hidden-xs" type="search" ng-model="$ctrl.searchStock" ng-change="$ctrl.getData($ctrl.searchStock)" ng-cloak/>
        <div class="list-group col-xs-12" ng-show="$ctrl.searchStock">
        	<a ng-repeat="stock in $ctrl.stocknames" class="list-group-item"'>{{stock}}</a>
        </div>`,
});

app.service('StockService', ['$http', function($http) {

    this.getStock = function(string) {
        console.log("Inisde service");
        var url = 'http://10.203.60.100:3000/search/' + string;
        console.log(url);
        return $http.get(url);
    }
}]);
*/
/*
app.component('searchComponent', {
        controller: ['StockService', function (stockService) {
            //$scope.searchStock = "TCS";
            //this.searchStock = "t";
            this.stocks = [];
            this.stocknames = [];
            var self = this;
            this.getData = function (search) {
                console.log('Inside getData fn');
                var promise = stockService.getStock(search);
                console.log(promise);
                promise.then(function(response) {
                    console.log(response.data.stock);
                    self.stocks = [];
                    self.stocknames = [];
                    self.stocks = response.data.stock;
                    for(var i=0 ; i < self.stocks.length ; i++ ){
                        self.stocknames[i] = self.stocks[i].stock_name;
                    }
                });
                //console.log(response.data);
            };
            
        }],
        template: `<input class="form-control" type="search" ng-model="$ctrl.searchStock" ng-change="$ctrl.getData($ctrl.searchStock)" ng-cloak/>
        <div class="list-group" ng-show="$ctrl.searchStock">
                <a ng-repeat="stock in $ctrl.stocknames" class="list-group-item"'>{{stock}}</a>
        </div>`,
    })

    .service('StockService', ['$http', function ($http) {

        this.getStock = function (string) {
            var url = 'http://10.203.60.100:3000/search/' + string;
            //var url = "http:/localhost:"
            console.log(url);
            var promise = $http.get(url);
            console.log("Promise : "+promise);
            return promise;
        }
    }]);
    */
    //var app = angular.module('sapp', [])

    /*  .controller('SearchController', ['$scope', 'StockService', function ($scope, stockService) {
        //$scope.searchStock = "TCS";
        //this.searchStock = "t";
        
            this.stocks = [];
            stockService.getStock(this.searchStock).then(function (response) {
                this.stocks = response.data;
            });
            console.log(this.searchStock);
            this.stocknames = [];
            for (var i = 0; i < this.stocks.length; i++) {
                this.stocknames[i] = this.stocks[i].name;
            }
    }])
*/
app.component('searchComponent', {
        controller: ['StockService', function (stockService) {
            //$scope.searchStock = "TCS";
            //this.searchStock = "t";
            this.stocks = [];
            this.stocknames = [];
            var self = this;
            this.getData = function (search) {
                var x = stockService.getStock(search);
                console.log(x);
                x.then(function(response) {
                    //console.log(response.data.stock);
                    self.stocks = [];
                    self.stocknames = [];
                    self.stocks = response.data.stock;
                    for(var i=0 ; i < self.stocks.length ; i++ ){
                        self.stocknames[i] = self.stocks[i].stock_name;
                    }
                });
                //console.log(response.data);
            };
            
        }],
        template: `<input class="form-control" type="search" ng-model="$ctrl.searchStock" ng-change="$ctrl.getData($ctrl.searchStock)" ng-cloak/>
        <div class="list-group" ng-show="$ctrl.searchStock">
                <a id="searchDropdown" ng-repeat="stock in $ctrl.stocknames" class="list-group-item" href="#/addorder"'>{{stock}}</a>
        </div>`,
    })

    .service('StockService', ['$http', function ($http) {

        this.getStock = function (string) {
            
            var url = 'http://10.203.60.100:3000/search/' + string;
            console.log(url);
            var promise =  $http.get(url);
            console.log(promise);
            return promise;
            
            
        }
    }]);



