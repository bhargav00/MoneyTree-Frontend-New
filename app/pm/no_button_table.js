// var app = angular.module('sapp', [])

app.component('nobuttontableComponent', {
    bindings: {
        tabletype: '@'
    },

    controller: ['$scope', 'NbTableDataService', function($scope, tableDataService) {
        this.tableHeaders = [];
        var tt = this.tabletype;
        //  this.editClicked = false;
        // this.updateClicked = true;
        //this.updateDone = false;
        var self = this;

        tableDataService.getData(tt).then(function(response) {

            var tableData = response.data.table;
            console.log(response.data.table);
            var firstRow = tableData[0];
            var i = 0;
            for (var key in firstRow) {
                self.tableHeaders[i] = key;
                i++;
            }
            i = 0;
            self.tableData = tableData;

        });

        this.orderByField = function(column) {
            this.field = column;
        }

    }],

    template: `
            <table class="table table-striped table-responsive table-bordered">
            <thead>
                <tr>
                    <th ng-repeat="th in $ctrl.tableHeaders" ng-click="$ctrl.orderByField(th)">{{th}}</th>
                </tr>
            </thead>
            <tbody>
            <tr ng-repeat="record in $ctrl.tableData | orderBy:$ctrl.field">
                <td  ng-repeat="property in $ctrl.tableHeaders">{{record[property]}}</td>
            </tr>
        </tbody>
        </table>
 
       
        
        `,
})

.service('NbTableDataService', ['$http', function($http) {

    this.getData = function(tableType) {
        var url = 'http://10.203.60.100:3000/' + tableType;
        //var url = 'http://localhost:3000/' + tableType;
        console.log(url);
        return $http.get(url);

    }

}])
