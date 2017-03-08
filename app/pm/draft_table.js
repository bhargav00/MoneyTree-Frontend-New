//var app = angular.module('sapp', [])

app.component('drafttableComponent', {
    bindings: {
        tabletype: '@'
    },


    controller: ['$window', '$scope', 'TableDataService', function ($window, $scope, tableDataService) {
        this.tableHeaders = [];
        var tt = this.tabletype;
        this.editClicked = false;
        this.updateClicked = true;
        this.updateDone = false;
        var self = this;


        tableDataService.getData(tt).then(function (response) {

            var tableData = response.data.table;
            console.log(response.data);
            var firstRow = tableData[0];
            var i = 0;
            for (var key in firstRow) {
                self.tableHeaders[i] = key;
                i++;
            }
            i = 0;
            self.tableData = tableData;


        });


        this.orderByField = function (column) {
            this.field = column;
        }

        this.edit = function (event, index) {
            this.index = index;
            self.editClicked = true;
            self.updateClicked = false;
            var tr = angular.element(event.target).parent().parent();
            var rowEntries = [];
            angular.forEach(tr.children(), function (td) {
                rowEntries.push(td.innerHTML);
            });
            rowEntries.pop();

            self.rowEntries = rowEntries;

            x = {};
            var l = this.tableHeaders.length;
            for (var i = 0; i < l; i++) {
                x[this.tableHeaders[i]] = this.rowEntries[i];
            }
            this.selectedData = x;

        }
        this.delete = function (event, index) {
            this.index = index;
            var data = {};
            data.index = index;
            tableDataService.deleteData(data);
            $window.location.href = '#/';
            self.updateDone = true;
        };

        this.update = function (event) {
            this.editClicked = false;
            this.updateClicked = true;
            var span = event.target.parentNode.querySelectorAll('.updateField');
            var data = {};
            for (var i = 0; i < span.length; i++) {
                var x = span[i].getAttribute('id');
                var y = angular.element(span[i]).val();
                data[x] = y;
            }
            data.index = this.index;
            console.log(data);
            tableDataService.sendData(data);
            $window.location.href = '#/orderdraft';
            self.updateDone = true;
        }

        this.submit = function (event, index) {
            this.index = index;
            console.log(index);
            var tr = angular.element(event.target).parent().parent();
            console.log(tr);
            var rowEntries = [];
            angular.forEach(tr.children(), function (td) {
                rowEntries.push(td.innerHTML);
            });
            rowEntries.pop();

            self.rowEntries = rowEntries;

            x = {};
            var l = this.tableHeaders.length;
            for (var i = 0; i < l; i++) {
                x[this.tableHeaders[i]] = this.rowEntries[i];
            }
            console.log(x);
            x.index = index;
            this.selectedData = x;
            console.log('Update index - ' + this.index);
            tableDataService.submitData(x);
            $window.location.href = '#/';
            self.updateDone = true;
        }

        this.cancel = function (event) {
            this.updateClicked = true;
            this.editClicked = false;
        }

    }],

    template: `
            <table class="table table-striped table-responsive table-bordered">
            <thead>
                <tr>
                    <th class="text-center" ng-repeat="th in $ctrl.tableHeaders" ng-click="$ctrl.orderByField(th)">{{th}}</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
            <tr ng-repeat="record in $ctrl.tableData | orderBy:$ctrl.field">
                <td class="text-center" ng-repeat="property in $ctrl.tableHeaders">{{record[property]}}</td>
                <td ng-if = "record['status']==='draft'">
                    <button class="btn btn-success" ng-click="$ctrl.submit($event,$index)"
                    ng-disabled="$ctrl.editClicked" >Submit</button>
                    <button class="btn btn-primary" ng-click="$ctrl.edit($event,$index)"
                    ng-disabled="$ctrl.editClicked" >Edit</button>
                    <button class="btn btn-danger" ng-click="$ctrl.delete($event)"
                    ng-disabled="$ctrl.editClicked">Delete</button>
                </td>  
            </tr>
        </tbody>
        </table>

        <section ng-hide="$ctrl.updateClicked">
            <form class="form form-inline" >
            <span ng-repeat="(key,value) in $ctrl.selectedData">
                {{key}}:
                <input type="text" class="updateField" id = "{{key}}" value="{{value}}"
                />
            </span>
            <button class="btn btn-success" style="margin-top:10px;" ng-click="$ctrl.update($event)" >Update</button>
            <button class="btn btn-danger" style="margin-top:10px;" ng-click="$ctrl.cancel($event)" >Cancel</button>
            </form>
        </section>
        
        `,
})

    .service('TableDataService', ['$http', function ($http) {

        this.sendData = function (data) {
            var url = 'http://localhost:3000/editDraft';
            //var url = 'http://10.203.60.100:3000/editDraft'
            $http.post(url, data).success(function () {
                console.log('edit successful')
            }).error(function () {
                console.log('edit failure');
            });
        }

        this.getData = function (tableType) {
            var url = 'http://10.203.60.100:3000/view_' + tableType;
            //var url = 'http://localhost:3000/' + tableType;
            var tabl = $http.get(url);
            return tabl;
        }

        this.deleteData = function (data) {
            var url = 'http://localhost:3000/deleteDraft';
            //var url = 'http://10.203.60.100:3000/deleteDraft'
            $http.post(url, data).success(function () {
                console.log('delete successful')
            }).error(function () {
                console.log('delete failure');
            });
        }

        this.submitData = function (data) {
            var url = 'http://localhost:3000/submit_draft';
            //var url = 'http://10.203.60.100:3000/deleteDraft'
            $http.post(url, data).success(function () {
                console.log('delete successful')
            }).error(function () {
                console.log('delete failure');
            });
        }
    }])