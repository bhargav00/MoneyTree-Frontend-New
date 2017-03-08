   var app=angular.module('sapp',['ui.router'])
     .config(function ($stateProvider,$urlServiceProvider) {
        $urlServiceProvider.rules.otherwise({state:'Order'}); 
        $stateProvider
            .state('portfolio', {
                url:'/',
                template:'<block-component></block-component>'
                        })
            .state('Order',{
                url:'/orders',
                template:'<order-table></order-table>'
            })
            .state('blockTrades',{
                url:'/blockTrades'
            })

    })