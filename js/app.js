var nameApp = angular.module('starter', ['ionic']);
 
nameApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
 
  $ionicConfigProvider.views.transition('none');
 
  $stateProvider
    .state('list', {
      url: '/',
      templateUrl: 'list.html',
      controller: 'ListCtrl'
    })
    .state('view', {
      url: '/movie/:movieid',
      templateUrl: 'view.html',
      controller: 'ViewCtrl'
    })
     .state('detail', {
      url: '/detail',
      templateUrl: 'detail.html',
      controller: 'ListCtrl'
    })

     .state('pujas', {
      url: '/pujas',
      templateUrl: 'pujas.html',
      controller: 'ListCtrl'
    })
          .state('filtros', {
      url: '/filtros',
      templateUrl: 'filtros.html',
      controller: 'ListCtrl'
    });
 
 
  $urlRouterProvider.otherwise("/");
 
});
 
nameApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
 
    // then override any default you want
    window.plugins.nativepagetransitions.globalOptions.duration = 350;
    window.plugins.nativepagetransitions.globalOptions.iosdelay = 350;
    window.plugins.nativepagetransitions.globalOptions.androiddelay = 350;
    window.plugins.nativepagetransitions.globalOptions.winphonedelay = 350;
    window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 4;
    // these are used for slide left/right only currently
    window.plugins.nativepagetransitions.globalOptions.fixedPixelsTop = 0;
    window.plugins.nativepagetransitions.globalOptions.fixedPixelsBottom = 0;
 
  });
});
 
nameApp.factory('Movies', function($http) {
  var cachedData;
  var movieName;
 
  function getData(moviename, callback) {
 
    var url = 'http://api.themoviedb.org/3/',
      mode = 'search/movie?query=',
      name = '&query=' + encodeURI(moviename),
      key = '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
 
    movieName = moviename;
 
    $http.get(url + mode + key + name).success(function(data) {
 
      cachedData = data.results;
      callback(data.results);
    });
  }
 
  return {
    list: getData,
    find: function(name, callback) {
      console.log(name);
 
      var movie = cachedData.filter(function(entry) {
        return entry.id == name;
      })[0];
      callback(movie);
    }
  };
 
});
 
nameApp.service('Navigation', function($state) {
  //directly binding events to this context
  this.goNative = function(view, data, direction) {
    $state.go(view, data);
    window.plugins.nativepagetransitions.slide({
        "direction": direction
      },
      function(msg) {
        console.log("success: " + msg)
      }, // called when the animation has finished
      function(msg) {
        alert("error: " + msg)
      } // called in case you pass in weird values
    );
  };
});
 
nameApp.controller('ListCtrl', function($scope, $http, Movies, $state,$ionicSlideBoxDelegate, $ionicSideMenuDelegate, Navigation) {



  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }
  

    $scope.pages = [{"text":"1", "background": "#4a87ee"},
                  {"text":"2", "background": "#43cee6"},
                 
                 ]
  
  $scope.trickOn = true;
  
  
  $scope.slideVisible = function(index){
    if(  index < $ionicSlideBoxDelegate.currentIndex() -1 
       || index > $ionicSlideBoxDelegate.currentIndex() + 1){
      return false;
    }
    
    return true;
  }
  
  $scope.toogleTrick = function(){
    $scope.trickOn = $scope.trickOn;
    
  }
 
  $scope.movie = {
    name: 'Batman'
  }
 
  $scope.obj = {
    prop: "world"
  };
 
 //Tiene q ir al factory esta parte
$scope.subastas=[

   {
  idSubasta:1,
  nombrePonente:"Maria",
  idPonente:1,
  tipo:"Cena",
  tipoSubasta:"subasta",
  valorInicial:30,
  vip:true,
  estado:"estadoActivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"3h 23min",
  image:'img/user1.jpg',
  descripcion:"Cena en restaurante vegetariano/hindu",
  col:'left-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 },

    {
  idSubasta:2,
  nombrePonente:"Pedro J.",
  idPonente:2,
  tipo:"Entretenimiento",
  tipoSubasta:"subasta",
  valorInicial:15,
  vip:false,
    estado:"estadoActivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"5h 10min",
  image:'img/user2.jpg',
  descripcion:"Salida por la tarde al cine",
  col:'right-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 },

     {
  idSubasta:3,
  nombrePonente:"Luis Mora",
  idPonente:3,
  tipo:"Entretenimiento",
  tipoSubasta:"subasta",
  valorInicial:25,
  vip:false,
    estado:"estadoInactivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"10h 47min",
  image:'img/user4.png',
  descripcion:"Acompanante para spa - masaje",
  col:'left-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 },

      {
  idSubasta:4,
  nombrePonente:"Paul G.",
  idPonente:4,
  tipo:"Cena",
  tipoSubasta:"subasta",
  valorInicial:15,
  vip:true,
    estado:"estadoActivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"11h 47min",
  image:'img/user5.jpg',
  descripcion:"Cena norcturna, lugar a escoger",
  col:'right-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 },
   {
  idSubasta:1,
  nombrePonente:"Maria",
  idPonente:1,
  tipo:"Cena",
  tipoSubasta:"subasta",
  valorInicial:30,
  vip:true,
  estado:"estadoActivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"3h 23min",
  image:'img/user1.jpg',
  descripcion:"Cena en restaurante vegetariano/hindu",
  col:'left-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 },

    {
  idSubasta:2,
  nombrePonente:"Pedro J.",
  idPonente:2,
  tipo:"Entretenimiento",
  tipoSubasta:"subasta",
  valorInicial:15,
  vip:false,
    estado:"estadoActivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"5h 10min",
  image:'img/user2.jpg',
  descripcion:"Salida por la tarde al cine",
  col:'right-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 },

     {
  idSubasta:3,
  nombrePonente:"Luis Mora",
  idPonente:3,
  tipo:"Entretenimiento",
  tipoSubasta:"subasta",
  valorInicial:25,
  vip:false,
    estado:"estadoInactivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"10h 47min",
  image:'img/user4.png',
  descripcion:"Acompanante para spa - masaje",
  col:'left-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 },

      {
  idSubasta:4,
  nombrePonente:"Paul G.",
  idPonente:4,
  tipo:"Cena",
  tipoSubasta:"subasta",
  valorInicial:15,
  vip:true,
    estado:"estadoActivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"11h 47min",
  image:'img/user5.jpg',
  descripcion:"Cena norcturna, lugar a escoger",
  col:'right-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 }
   ];

 //
  $scope.searchMovieDB = function() {
 
    Movies.list($scope.movie.name, function(movies) {
      $scope.movies = movies;
    });
 
  };
 
  $scope.changePage = function(id) {
    //Navigation.goNative('view', {movieid:id}, 'up');  
  };
 
  $scope.searchMovieDB();
 
});
 
nameApp.controller('ViewCtrl', function($scope, $http, $stateParams, Movies) {
  Movies.find($stateParams.movieid, function(movie) {
    $scope.movie = movie;
  });
});
 
nameApp.directive('goNative', ['$ionicGesture', '$ionicPlatform', function($ionicGesture, $ionicPlatform) {
  return {
    restrict: 'A',
 
    link: function(scope, element, attrs) {
 
      $ionicGesture.on('tap', function(e) {
 
        var direction = attrs.direction;
        var transitiontype = attrs.transitiontype;
 
        $ionicPlatform.ready(function() {
 
          switch (transitiontype) {
            case "slide":
              window.plugins.nativepagetransitions.slide({
                  "direction": direction
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;
            case "flip":
              window.plugins.nativepagetransitions.flip({
                  "direction": direction
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;
               
            case "fade":
              window.plugins.nativepagetransitions.fade({
                   
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;
 
            case "drawer":
              window.plugins.nativepagetransitions.drawer({
                  "origin"         : direction,
                  "action"         : "open"
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;
               
            case "curl":
              window.plugins.nativepagetransitions.curl({
                  "direction": direction
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;              
               
            default:
              window.plugins.nativepagetransitions.slide({
                  "direction": direction
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
          }
 
 
        });
      }, element);
    }
  };
}]);


  nameApp.directive('countdown', [
        'Util',
        '$interval',
        function (Util, $interval) {
            return {
                restrict: 'A',
                scope: { date: '@' },
                link: function (scope, element) {
                    var future;
                    future = new Date(scope.date);
                    $interval(function () {
                        var diff;
                        diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                        return element.text(Util.dhms(diff));
                    }, 1000);
                }
            };
        }
    ]);

  nameApp.factory('Util', [function () {
            return {
                dhms: function (t) {
                    var days, hours, minutes, seconds;
                    days = Math.floor(t / 86400);
                    t -= days * 86400;
                    hours = Math.floor(t / 3600) % 24;
                    t -= hours * 3600;
                    minutes = Math.floor(t / 60) % 60;
                    t -= minutes * 60;
                    seconds = t % 60;
                    return [
                        days + 'd',
                        hours + 'h',
                        minutes + 'm',
                        seconds + 's'
                    ].join(' ');
                }
            };
        }]);