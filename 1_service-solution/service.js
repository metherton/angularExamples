(function () {
  var module = angular.module('app', []);

  module.factory('commentStorage', function () {
    return {
      get: function () {
        return JSON.parse(localStorage.getItem('comments') || '[]');
      },

      put: function (comments) {
        localStorage.setItem('comments', JSON.stringify(comments));
      }
    };
  });

//  module.service('commentStorage', function() {
//    this.get = function() {
//      return JSON.parse(localStorage.getItem('comments') || '[]');
//    }
//    this.put = function(comments) {
//      localStorage.setItem('comments', JSON.stringify(comments));
//    }
//  });

//  module.provider('commentStorage', function() {
//    var self = this;
//    self.storageId = 'comments';
//    self.$get = function() {
//      return {
//        get: function () {
//          return JSON.parse(localStorage.getItem(self.storageId) || '[]');
//        },
//
//        put: function (comments) {
//          localStorage.setItem(self.storageId, JSON.stringify(comments));
//        }
//      }
//    }
//  });
//
//  module.config(function(commentStorageProvider) {
//    commentStorageProvider.storageId = 'customKey';
//  });

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
