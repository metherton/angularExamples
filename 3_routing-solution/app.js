(function() {
  var module = angular.module('app', ['ngRoute']);

  module.config(function($routeProvider) {
    $routeProvider.when('/comments', {templateUrl: 'partials/commentList.html', controller: 'CommentListCtrl'});
    $routeProvider.when('/comments/:commentId', {templateUrl: 'partials/commentDetails.html', controller: 'CommentDetailsCtrl'});
    $routeProvider.otherwise({redirectTo: '/comments'});
  });

  module.controller('CommentListCtrl', function($scope, commentService, $routeParams, filterFilter, $location) {
    $scope.comments = commentService.getComments();

    if($routeParams.search) {
      $scope.comments = filterFilter($scope.comments, $routeParams.search);
    }

    $scope.addComment = function() {
      var commentId = commentService.addComment($scope.newComment);
      $scope.newComment = {};
      $location.url('/comments/' + commentId);
    };

    $scope.searchComments = function() {
      if($scope.searchText) {
        $location.url('/comments?search=' + encodeURIComponent($scope.searchText));
      }
      else {
        $location.url('/comments');
      }
    };
  });

  module.controller('CommentDetailsCtrl', function($scope, commentService, $routeParams, $window) {
    $scope.comment = commentService.getComment($window.parseInt($routeParams.commentId));
  });

  module.filter('commentUrl', function() {
    return function(comment) {
      return '#/comments/' + comment.id;
    }
  });

  module.factory('commentService', function($window) {
    var nextId = 5;

    var comments = [{
      id: 1,
      author: 'Edith',
      title: 'This rocks',
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
    }, {
      id: 2,
      author: 'Dave',
      title: 'Absolutely horrible car finding service',
      content: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper.'
    },{
      id: 3,
      author: 'Bob',
      title: 'I don\'t think so',
      content: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'
    }, {
      id: 4,
      author: 'Charlie',
      title: 'Cheap Viagra',
      content: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
    }];

    return {
      getComments: function( ){
        return comments;
      } ,
      getComment: function(id) {
        id = id;
        for(var i = 0; i < comments.length; ++i) {
          if(comments[i].id === id) {
            return comments[i];
          }
        }
      },
      addComment: function(comment) {
        comment.id = nextId++;
        comments.push(comment);
        return comment.id;
      }
    };
  });

})();
