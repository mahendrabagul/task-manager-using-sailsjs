
define(function () {
    return ['$scope', '$http', function($scope, $http) {
    function resetItem(){
       $scope.task = {
          taskname : '',
          taskdate : '',
          id : ''
       };              
       $scope.displayForm = '';
       
    }
    resetItem();
    $scope.addItem = function () {
      resetItem();
      $scope.displayForm = true;
    }
    $scope.saveItem = function () {
      var tsk = $scope.task;
      if (tsk.id.length == 0){
        $http.get('/task/create?taskname=' + tsk.taskname + '&taskdate=' +  tsk.taskdate).success(function(data) {
          $scope.items.push(data);
          $scope.displayForm = '';
          removeModal();
        }).error(function(data, status, headers, config) {
          alert(data.summary);
        });
      }
      else{
          $http.get('/task/update/'+ tsk.id +'?taskname=' + tsk.taskname + '&taskdate=' +  tsk.taskdate ).success(function(data) {
          $scope.displayForm = ''
          removeModal();
        }).error(function(data, status, headers, config) {
          alert(data.summary);
        });
      }
    };
 
    $scope.editItem = function (data) {       
      $scope.task = data;
      $scope.displayForm = true;
    }
 
    $scope.removeItem = function (data) {
      if (confirm('Do you really want to delete?')){
        $http['delete']('/task/' + data.id).success(function() {
          $scope.items.splice($scope.items.indexOf(data), 1);
        });
      }
    };
    $http.get('/task/find').success(function(data) {
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