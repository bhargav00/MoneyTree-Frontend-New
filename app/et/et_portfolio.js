//var app = angular.module('sapp', [])
app
    .controller('blockController', ['blockTradeService', function (btService) {
        //this.eBlocks = btService.getExecuted();

        var self = this;
        self.eBlocks = [];
        self.pBlocks = [];
        this.execute = function (index) {


            // this.eBlocks[y] = this.pBlocks[index];
            // this.eBlocks[y].bId = this.eBlocks[y - 1].bId + 1;
            // this.pBlocks.splice(index, 1);
            self.eBlocks.push(self.pBlocks[index]);
            var y = self.eBlocks.length;
            self.pBlocks.splice(index, 1);
            console.log(self.pBlocks);
            //self.pBlocks[index].status="executed";
            //self.eBlocks=btService.getExecuted();

        }
        this.blockCreation = function () {
            var x = btService.getPending();
            x.then(function (response) {
                self.pBlocks = response.data;
                console.log(self.pBlocks);

            })
        }
    }])

    .component('blockComponent', {

        controller: 'blockController',
        bindings: {},
        template: `    <button class="btn btn-large btn-success" name="intialiseBlock" type="submit" ng-click="$ctrl.blockCreation()">Initialise Block Creation</button>   
                <h3>Pending Blocks:{{$ctrl.pBlocks.length}}</h3>
                <table class="table">
        <tr>
            <th>Block id</th>
            <th>Side</th>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Market Price</th>
            <th>Limit Price</th>
            <th>Stop Loss Price</th>
            <th>Operation</th>
        </tr>
        <tr ng-repeat= "x in $ctrl.pBlocks track by $index" >
            <td>{{x.block_id}}</td>
            <td>{{x.side}}</td>
            <td>{{x.symbol}}</td>
            <td>{{x.total_qty}}</td>
            <td>{{x.current_price}}</td>
            <td>{{x.limit_price}}</td>
            <td>{{x.stop_price}}</td>
            <td><button name="execute" type="submit" ng-click="$ctrl.execute($index)" class="btn btn-primary">Execute</button></td> 
        </tr>
    </table>
    <h3>Executed Blocks:{{$ctrl.eBlocks.length}}</h3>
     <table class="table">
        <tr>
            <th>Block ID</th>
            <th>Side</th>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Market Price</th>
            <th>Limit Price</th>
            <th>Stop Loss Price</th>
            <th>Time Stamp</th>
            
        </tr>
        <tr ng-repeat= "x in $ctrl.eBlocks track by $index">
            <td>{{x.block_id}}</td>
            <td>{{x.side}}</td>
            <td>{{x.symbol}}</td>
            <td>{{x.total_qty}}</td>
            <td>{{x.current_price}}</td>
            <td>{{x.limit_price}}</td>
            <td>{{x.stop_price}}</td>
            <td>{{x.block_timestamp}}</td>
            
        </tr>
    </table>
    `
    })

    .service('blockTradeService', ['$http', function ($http) {

        this.getPending = function () {

            console.log("tishji");

            return $http.get('http://10.203.60.100:3000/create_block');
        }
        this.getExecuted = function () {
            var executedBlocks = [];
            var i = 0;
            for (var j = 0; j < self.pBlocks.length; j++) {
                if (self.pBlocks[j].status == 'Executed') {
                    executedBlocks[i++] = self.pBlocks[j];
                }
            }
            return executedBlocks;
        }

    }])