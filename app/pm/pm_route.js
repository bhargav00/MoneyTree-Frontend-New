   var app=angular.module('sapp',['ui.router'])
     .config(function ($stateProvider,$urlServiceProvider) {
        $urlServiceProvider.rules.otherwise({state:'portfoliopm'}); 
        $stateProvider
            .state('portfoliopm', {
                url:'/',
                //template:'<drafttable-component tabletype="draft"></table-component>'
                template: '<nobuttontable-component tabletype="history"></nobuttontable-component>'
            })
            .state('newOrder',{
                url:'/addorder',
                template:'<form-component></form-component>'
            })
            .state('orderDraft',{
                url:'/orderdraft',
                template:'<drafttable-component tabletype="draft"></table-component>'
            })

    })

