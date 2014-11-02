(function () {
  var module = angular.module('app', []);
  module.controller('ClassExerciseCtrl', function ($scope) {
    $scope.comments = [
      {
        id: 1,
        author: 'Alice',
        title: 'This rocks',
        content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
      },
      {
        id: 2,
        author: 'Bob',
        title: 'I don\'t think so',
        content: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'
      },
      {
        id: 3,
        author: 'Charlie',
        title: 'Cheap Viagra',
        content: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
      },
      {
        id: 4,
        author: 'Dave',
        title: 'Where is my car',
        content: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
      },
      {
        id: 5,
        author: 'Edith',
        title: 'Re: This rocks',
        content: 'What Bob said'
      }
    ];
  })
})();
