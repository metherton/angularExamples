(function () {
  var module = angular.module('app', []);


  // create the commentStorage service.
  // Hint: to store comments in local storage under the key 'comments, do
  // localStorage.setItem('comments', JSON.stringify(comments));
  // To read them from local storage:
  // JSON.parse(localStorage.getItem('comments') || '[]')

  module.provider('injectedProvider', function() {
    this.$get = function() {
      return {
        somethingBeautiful: "Fluttershy"
      };
    }
  });

  module.provider('commentStorage', function (injectedProviderProvider) {
    var storekey = "comments";
    this.setStoreKey = function(value) {
      storekey = value;
    }
    this.$get = function() {
    return {
      get: function() {
        console.log(storekey);
        return JSON.parse(localStorage.getItem(storekey) || '[]');
      },
      put: function(comments) {
        console.log(storekey);
        localStorage.setItem(storekey, JSON.stringify(comments));
      }
    }}
  });

  module.config(function(commentStorageProvider) {
    commentStorageProvider.setStoreKey("newTestKey");
  })

  module.controller('AppCtrl', function ($scope, commentStorage) {
    $scope.comments = commentStorage.get();
    $scope.newComment = {};

    $scope.clearComments = function () {
      $scope.comments = [];
    };
    $scope.saveComments = function () {
      commentStorage.put($scope.comments);
    };

    $scope.loadComments = function () {
      $scope.comments = commentStorage.get();
    }

    $scope.addComment = function () {
      $scope.comments.push($scope.newComment);
      $scope.newComment = {};
    }
  });

})();
