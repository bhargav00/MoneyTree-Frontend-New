// var app = angular.module('sapp', ['ngRoute'])
//  app
//     .config(['$routeProvider', function ($routeProvider) {
//         $routeProvider
//             .when('/', {
//                 template: '<order-table></order-table>',
//                 controller: 'traderComponent'
//             })

//     }])
app
    .controller('traderComponent', ['traderService', function (traderService) {
        var y = traderService.getData();
        var self = this;
        y.then(function(response){
            self.orderData=response.data.table;
            self.operation=[];
            for(var i=0;i<self.orderData.length;i++)
            self.operation[i]=false;
            console.log(self.orderData[0]);
        })
        this.switch = function (index) {
            console.log('hello');
            self.operation[index]=true;
            self.orderData[index].status="Sent for block creation";
            console.log(self.orderData[index].order_id);
            var promise=traderService.send(self.orderData[index].order_id);

        }
        this.del = function (index) {
            this.stockDetails.splice(index, 1);
        }

    }])

    .component('orderTable', {

        controller: 'traderComponent',
        bindings: {},
        template: `<section class="row">
        <div class="col-md-6 form-group">
        <label for="searchId" class="col-md-4">SELECT YOUR PM</label>
        <div class="col-md-8"> <input id="searchId" class="form-control inline-form" placeholder="search here" type="search" ng-cloak ng-model="searchStock"></div>
        </div>
        <div class="col-md-6">
        <div class="dropdown">
        </div>
        </div>
        </section>
        <br>

        <section class="row">
        
        <div class="row table-responsive"> 
                <table class="table table-bordered table-hover table-striped">
                <tr>
                <th>PM NAME</th>
                <th>ORDER ID</th>
                <th>ORDER NAME</th>
                <th>SIDE</th>
                <th>SYMBOL</th>
                <th>QUANTITY</th>
                <th>MARKET PRICE</th>
                <th>BID</th>
                <th>LIMIT PRICE</th>
                <th>STOP PRICE</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>OPERATION</th>
                
                </tr>
                <tr ng-repeat="stock in $ctrl.orderData |filter:searchStock">
                <td>{{stock.pm_name}}</td>
                <td>{{stock.order_id}}</td>
                <td>{{stock.stock_name}}</td>
                <td>{{stock.side}}</td>
                <td>{{stock.symbol}}</td>
                <td>{{stock.open_qty}}</td>
                <td>{{stock.price}}</td>
                <td>{{stock.current_price}}</td>
                <td>{{stock.limit_price}}</td>
                <td>{{stock.stop_price}}</td>
                <td>{{stock.order_timestamp}}</td>
                <td>{{stock.status}}</td>
                <td><button class="btn btn-success" ng-hide="$ctrl.operation[$index]" ng-click="$ctrl.switch($index)">ACCEPT</button><br><button class="btn btn-danger" ng-hide="$ctrl.operation[$index]" ng-click="$ctrl.del($index)">REJECT</button></td>   
                </section>`
    })

    .service('traderService', ['$http',function ($http) {
       /* var stocks = [{
                pm_name: 'RISHI',
                orderID: 1,
                orderName: 'TCS',
                side: 'Buy',
                symbol: 'NSE',
                qty: 500,
                limit_price: 55,
                stop_price: '-',
                date: '22/5/2016',
                time: '10:34 AM',
                status: 'complete',
                operation: true
            }, {
                pm_name: 'ISHI',
                orderID: 1,
                orderName: 'wipro',
                side: 'Buy',
                symbol: 'BSE',
                qty: 500,
                limit_price: 55,
                stop_price: '-',
                date: '22/5/2016',
                time: '10:34 AM',
                status: 'pending',
                operation: false
            },
            {
                pm_name: 'RISHI',
                orderID: 1,
                orderName: 'TCS',
                side: 'Sell',
                symbol: 'NSE',
                qty: 500,
                limit_price: 55,
                stop_price: '-',
                date: '22/5/2016',
                time: '10:34 AM',
                status: 'complete',
                operation: '<button class="btn">ACCEPT</button><br><button class="btn">REJECT</button>'
            }
        ];*/
        this.send=function(order){
            var x={}
            x.order_id=order;
            return $http.post('http://10.203.60.100:3000/accept_order',x);
        }
        this.getData = function () {
            var url = 'http://10.203.60.100:3000/order_book';
            return $http.get(url);
        
        }
    }])