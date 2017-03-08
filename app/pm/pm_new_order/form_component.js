    app.controller('SearchController', ['$window','StockService', function($window,stockService) {
        //$scope.searchStock = "TCS";
        // this.stocks = stockService.getStock();
        this.selectStock = function(stock) {
            this.searchStock = stock.stock_name;
            this.current_price=stock.price;
            this.stock_id=stock.s_id;
        };
        var self = this;
        stockService.getTrader().then(function(response) {
            self.traders = [];
            //console.log(response.data);
            self.traders = response.data;
            //console.log("Tradders:");
            //console.log(self.traders);
        });
        // this.traders = stockService.getTrader();


        this.getData = function(search) {
            stockService.getStock(search).then(function(response) {
                self.stocks = [];
                self.stocks = response.data.stock;
                // console.log(self.stocks);
            });
        };
        this.submit_form = function() {
            var x = {};
            x.stock_name = this.searchStock;
            //x.trader_name = this.tradername.et_id;
            if (typeof this.tradername === 'undefined'||'null') {
                x.et_id = 'null';
            } else {
                x.et_id = this.tradername.id;
            }
            // console.log(x.et_id);
            x.s_id=this.stock_id;
            x.quantity = this.quantity;
            x.side = this.side;
            x.symbol = this.symbol;
            x.current_price = this.current_price;
            x.limit_price = this.limit_price;
            x.stop_price = this.stop_price;
            if (typeof this.limit_price === 'undefined' && typeof this.stop_price === 'undefined' && typeof this.current_price !== 'undefined')
                x.order_type = 'Market Order';
            else if (typeof this.limit_price !== 'undefined' && typeof this.stop_price === 'undefined' && typeof this.current_price === 'undefined')
                x.order_type = 'Limit Order';
            else if (typeof this.limit_price === 'undefined' && typeof this.stop_price !== 'undefined' && typeof this.current_price === 'undefined')
                x.order_type = 'Stop Order';
            else if (typeof this.limit_price !== 'undefined' && typeof this.stop_price !== 'undefined' && typeof this.current_price === 'undefined')
                x.order_type = 'Stop Limit Order';

            stockService.sendOrder(x);
             $window.location.href = '#/';

        };
        this.draft_form=function(){
            var x = {};
            x.stock_name = this.searchStock;
            //x.trader_name = this.tradername.et_id;
            if (typeof this.tradername === 'undefined') {
                x.et_id = 0;
            } else {
                x.et_id = this.tradername.id;
            }
            // console.log(x.et_id);
            x.s_id=this.stock_id;
            x.quantity = this.quantity;
            x.side = this.side;
            x.symbol = this.symbol;
            x.current_price = this.current_price;
            x.limit_price = this.limit_price;
            x.stop_price = this.stop_price;
            if (typeof this.limit_price === 'undefined' && typeof this.stop_price === 'undefined' && typeof this.current_price !== 'undefined')
                x.order_type = 'Market Order';
            else if (typeof this.limit_price !== 'undefined' && typeof this.stop_price === 'undefined' && typeof this.current_price === 'undefined')
                x.order_type = 'Limit Order';
            else if (typeof this.limit_price === 'undefined' && typeof this.stop_price !== 'undefined' && typeof this.current_price === 'undefined')
                x.order_type = 'Stop Order';
            else if (typeof this.limit_price !== 'undefined' && typeof this.stop_price !== 'undefined' && typeof this.current_price === 'undefined')
                x.order_type = 'Stop Limit Order';

            stockService.sendDraft(x);
             $window.location.href = '#/';
        };
    }])


    .component('formComponent', {
        templateUrl: './pm_new_order/html_form_component.html',
        controller: 'SearchController'
    })

    .service('StockService', ['$http', function($http) {

        this.getStock = function(string) {
            var url = 'http://10.203.60.100:3000/search/' + string;
            return $http.get(url);
        };

        this.getTrader = function() {
            var url = 'http://10.203.60.100:3000/get_et';
            return $http.get(url);
        };

        this.sendOrder = function(y) {
            var z = JSON.stringify(y);
            console.log(z);
            var url = 'http://10.203.60.100:3000/create_order';
            return $http.post(url, z);
        };

        this.sendDraft=function(y){
            var z = JSON.stringify(y);
            console.log(z);
            var url = 'http://10.203.60.100:3000/create_draft';
            return $http.post(url, z);
        }
    }]);