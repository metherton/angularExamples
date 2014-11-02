(function() {
  var module = angular.module('app', ['ngRoute']);

  // the controller for the comment list
  module.controller('CommentListCtrl', function($scope, commentService) {
    $scope.comments = commentService.getComments();

    $scope.addComment = function() {
      commentService.addComment($scope.newComment);
      $scope.newComment = {};
    };
  });

  // the controller for displaying
  module.controller('CommentDetailsCtrl', function($scope) {
    // put the comment on scope
    // use the $routeParams service to retrieve the commentId
    // $scope.comment =
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
      }
    };
  });

})();
