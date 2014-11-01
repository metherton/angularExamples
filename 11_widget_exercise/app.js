(function() {
  var module = angular.module('app', []);

  module.directive('commentList', function() {
    return {
      controller: function($scope) {
        console.log('controller constructor');
      },
      restrict: 'E',
      scope: {
        comments: '='
      },
      templateUrl: 'commentList.html'
    };
  });

  module.directive('commentForm', function() {
    return {
      controller: function($scope, $attrs) {
        $scope.submit = function() {
          $scope.addComment({comment: $scope.comment});
        };
      },
      restrict: 'E',
      replace: true,
      scope: {
        addComment: '&'
      },
      templateUrl: 'commentForm.html'
    };
  });

  module.controller('AppCtrl', function($scope) {
    $scope.newComment = {};

    $scope.addComment = function(comment) {
      comment.id = nextCommentId++;
      $scope.comments.push(comment);
    };

    var nextCommentId = 8;

    $scope.comments =  [{
      id: 1,
      author: 'Edith',
      title: 'This rocks',
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
    }, {
      id: 7,
      author: 'Dave',
      title: 'Absolutely horrible car finding service',
      content: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper.'
    },{
      id: 2,
      author: 'Bob',
      title: 'I don\'t think so',
      content: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'
    }, {
      id: 3,
      author: 'Charlie',
      title: 'Cheap Viagra',
      content: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
    }, {
      id: 5,
      author: 'Alice',
      title: 'Re: This rocks',
      content: 'What Bob said'
    }, {
      id: 4,
      author: 'Dave',
      title: 'Where is my car',
      content: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
    }, {
      id: 6,
      author: 'Dave',
      title: 'Still can\'t find my car',
      content: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper.'
    }];
  });

})();
