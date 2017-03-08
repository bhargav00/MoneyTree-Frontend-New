var app = angular.module('sapp', [])
    .controller('DynamicTableController', ['DynamicTableService', function(dynamicTableService) {
        this.getData = dynamicTableService.getTable();
        //console.log(this.getData[0]);
    }])
    .component('tableComponent', {
        bindings: {

        },
        controller: 'DynamicTableController',
        template: `
            <div class="container">
                <table class="table table-stripped">
                    <thead>
                        <th ng-repeat="(key,value) in $ctrl.getData[0]">{{key}}</th>
                    </thead>
                    <tbody>
                        <tr ng-repeat="demo in $ctrl.getData">
                            <td ng-repeat="test in demo">
                            {{test}}
                             </td>
                             <td>
                            <button class="btn btn-default " ng-click="fun()" ng-if="demo.status=='incomplete'">edit</button>
                            <button class="btn btn-default " ng-click="fun()" ng-if="demo.status=='incomplete'">delete</button>    
                             <td/>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    })
    .service('DynamicTableService', function() {
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
    })