
define(function () {
    return ['$scope', '$http', function($scope, $http) {
    function resetItem(){
       $scope.login = {
          email : '',
          password : '',
       };              
       $scope.displayForm = '';
       
    }
    resetItem();
    $scope.addItem = function () {
      resetItem();
      $scope.displayForm = true;
    }

    $scope.login = function () {
      var usr = $scope.user;
      $http.post('/login', {
            email: usr.email,
            password:usr.password
      }).success(function(data) {
            $scope.items.push(data);
            $scope.displayForm = '';
            removeModal();
      }).error(function(data, status, headers, config) {
            alert(data.summary);
      });
     };

    $scope.editItem = function (data) {       
            $scope.user = data;
            $scope.displayForm = true;
    }
    $scope.removeItem = function (data) {
      if (confirm('Do you really want to delete?')){
        $http['delete']('/user/' + data.id).success(function() {
          $scope.items.splice($scope.items.indexOf(data), 1);
        });
      }
    };
    $http.get('/user/find').success(function(data) {
      for (var i = 0; i < data.length; i++) {
        data[i].index = i;
      }
      $scope.items = data;
    });
    function removeModal(){
     $('.modal').modal('hide');          
    }
  }];
});