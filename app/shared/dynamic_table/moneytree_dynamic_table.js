var app = angular.module('sapp', [])
    .controller('DynamicTableController', ['DynamicTableService', function(dynamicTableService) {
        console.log('controller');
        var tt = this.tabletype;
        var self = this;
        dynamicTableService.getData(tt).then(function(response) {
            self.tableData = response.data;
            console.log("Inside ");
            console.log(self.tableData);
        });
        //console.log(this.getData[0]);
    }])
    .component('tableComponent', {
        bindings: {
            tabletype: '@'
        },
        controller: 'DynamicTableController',
        template: `
            <div class="container">
                <table class="table table-striped">
                    <thead>
                        <th ng-repeat="(key,value) in $ctrl.tableData[0]">{{key}}</th>
                    </thead>
                    <tbody>
                        <tr ng-repeat="demo in $ctrl.tableData">
                            <td ng-repeat="test in demo">
                            {{test}}
                            </td>
                            <td ng-if="demo.status=='incomplete'">
                            <button class="btn btn-primary" ng-click="fun()" ng-if="demo.status=='incomplete'">edit</button>
                            <button class="btn btn-danger" ng-click="fun()" ng-if="demo.status=='incomplete'">delete</button>    
                            <td/>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    })
    /*.service('DynamicTableService', function() {
        var mockData = [
            { "name": "anshul", "city": "noida", "sub": "maths", "status": "complete" },
            { "name": "akshay", "city": "delhi", "sub": "eco", "status": "complete" },
            { "name": "ayushi", "city": "paris", "sub": "maths", "status": "incomplete" },
            { "name": "rajenki", "city": "delhi", "sub": "science", "status": "incomplete" },
            { "name": "aseem", "city": "chennai", "sub": "english", "status": "complete" },
            { "name": "ankur", "city": "california", "sub": "maths", "status": "incomplete" }
        ];
        this.getTable = function() {
            return mockData;
        }
    })*/
    .service('DynamicTableService', ['$http', function($http) {
        this.getData = function(tableType) {
            console.log("inside service");
            var url = 'http://localhost:3000/' + tableType;
            return $http.get(url);
        }
    }])