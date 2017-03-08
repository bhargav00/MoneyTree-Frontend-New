   /*     $(document).ready(function () {
            var email, pass;
            $("#submit").click(function () {
                username = $("#username").val();
                pass = $("#password").val();
                alert(username);
                /*
                * Perform some validation here.
                */
        /*        $.post("http://10.203.60.180:3000/login", { username: username, password: pass }, function (data) {
                    alert(data.access_type);
                    if (data.status == 'succesful' && data.access_type == 'pm') {
                        window.location.href = "./pm/";
                    }
                    else if (data.status == 'succesful' && data.access_type == 'et') {
                        window.location.hre = "./et/";
                    }f
                    else
                        alert(data.status);
                });
            });
        });*/

        var app=angular.module('sapp',[])
        .constant('ConfigData',{
            api: 'http://10.203.60.180:3000/login',
            genericApi: 'http://10.203.60.180:3000'
        })
        .controller('LoginController',['$scope','$http','ConfigData', '$remember',function($scope,$http,ConfigData,$remember){
            $scope.username;
            $scope.password;
            $scope.type='pm';
            $scope.data;
            $scope.status1=false;
            $scope.status2=false;
            $scope.status_text;
             $scope.sendData = function(){
                   $http.post(ConfigData.api,{
                    username : $scope.username,
                    password : $scope.password,
                    type : $scope.type
                }).then(
                function(response){
                //console.log(response.data);
               // console.log(response.data.status);
               // console.log(response.data.access_type);


                if(response.data.status == 'succesful'){
                    
                    $scope.status1 = true;
                    $scope.status2 = false;
                    $scope.status_text='Successful Login';
                    $remember('hash_key', response.data.token);
                   setTimeout(function(){window.location.href = "./"+ response.data.access_type + "/"},2000);
                }
                else if(response.data.status == 'failure'){
                    $scope.status2 = true;
                    $scope.status1 = false;
                    $scope.status_text='Please Enter Valid Credentails';
                }

        });
            }  

             $scope.remember = false;
             if ($remember('username') && $remember('password') ) {
            $scope.remember = true;
            $scope.username = $remember('username');
            $scope.password = $remember('password');
        }
           $scope.rememberMe= function(){
            if ($scope.remember) {
                $remember('username', $scope.username);
                $remember('password', $scope.password);
                //$remember('hash_key', $scope.username);
                
            } else {
                $remember('username', '');
                $remember('password', '');
                //$remember('hash_key', $scope.username);
            }
           }  
     }])

    .factory('$remember', function() {
        function fetchValue(name) {
                var gCookieVal = document.cookie.split("; ");
                for (var i=0; i < gCookieVal.length; i++)
                {
                
                    var gCrumb = gCookieVal[i].split("=");
                    if (name === gCrumb[0])
                    {
                        var value = '';
                        try {
                            value = angular.fromJson(gCrumb[1]);
                        } catch(e) {
                            value = unescape(gCrumb[1]);
                        }
                        return value;
                    }
                }

                return null;
            }
            return function(name, values) {
                if(arguments.length === 1) return fetchValue(name);
                var cookie = name + '=';
                if(typeof values === 'object') {
                    var expires = '';
                    cookie += (typeof values.value === 'object') ? angular.toJson(values.value) + ';' : values.value + ';';
                    if(values.expires) {
                        var date = new Date();
                        date.setTime( date.getTime() + (values.expires * 24 *60 * 60 * 1000));
                        expires = date.toGMTString();
                    }
                    cookie += (!values.session) ? 'expires=' + expires + ';' : '';
                    cookie += (values.path) ? 'path=' + values.path + ';' : '';
                    cookie += (values.secure) ? 'secure;' : '';
                } else {
                    cookie += values + ';';
                }
                document.cookie = cookie;
            }
    
});
    