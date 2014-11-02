describe('unitTestingExercise', function () {
  beforeEach(module('unitTestingExercise'));

  describe('commentCtrl', function() {
    var mockComment = {  id: 2,
      author: 'Bob',
      title: 'I don\'t think so',
      content: 'Ut wisi enim ad minim veniam.'
    };

    var $routeParamsMock, $locationMock, scope, ctrl;

    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
      $routeParamsMock = {commentId: 2};
      $locationMock = {
        url: function() {}
      };
      scope = $rootScope.$new();


      spyOn($locationMock, 'url');

      ctrl = $controller('CommentCtrl', {
        $scope: scope,
        $routeParams: $routeParamsMock,
        $location: $locationMock
      });

      $httpBackend.whenGET('/api/comments/2').respond(200, mockComment);
    }));


    describe('Upon creation', function() {
      it('Should fetch the comment and put it on scope', inject(function($httpBackend) {

        // before the call to backend completes, we expect the comment to be undefined
        expect(scope.comment).toBeUndefined();

        $httpBackend.flush();

        expect(scope.comment).toBeDefined();
        expect(scope.comment.id).toEqual(2);
      }));

    });

    describe('deleteComment', function() {
      it('Should delete the comment', inject(function($controller, $rootScope, $httpBackend) {
        $httpBackend.flush();
        $httpBackend.expectDELETE('/api/comments/2').respond(200, {});

        scope.deleteComment();

        $httpBackend.flush();

        expect($locationMock.url.calls.count()).toEqual(1);
        expect($locationMock.url).toHaveBeenCalledWith('/comments');
      }));
    });
  });

  describe('commentUrl filter', function() {
    it('The URL for comment with id 2 should be "#/comments/2"', inject(function(commentUrlFilter) {
      expect(commentUrlFilter({id: 2})).toBe('#/comments/2');
    }));
  });
});