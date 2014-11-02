describe('CommentListCtrl', function() {
  beforeEach(module('unitTestingDemo'));

  var mockCommentList = [{
    id: 1,
    author: 'Alice',
    title: 'This rocks',
    content: 'Lorem ipsum dolor sit amet.'
},{
  id: 2,
  author: 'Bob',
  title: 'I don\'t think so',
  content: 'Ut wisi enim ad minim veniam.'
}];

  var scope, ctrl;


  // We create a simple mock for the $route service, only the reload function is used
  var $routeMock = { reload: function() {}};

  beforeEach(inject(function($httpBackend, $controller, $rootScope) {
    $httpBackend.when('GET', '/api/comments').respond(mockCommentList);

    // setup scope and controller

    scope = $rootScope.$new();
    ctrl = $controller('CommentListCtrl', {
      $scope: scope,
      $route: $routeMock
    });

  }));
  describe('Upon creation', function() {
    it('Should get comments from server and put them in scope', inject(function($httpBackend ) {
      // flushing $httpBackend will cause all outstanding $http callbacks to run
      $httpBackend.flush();

      // verify the data on scope
      expect(scope.comments).toBeDefined();
      expect(angular.isArray(scope.comments)).toBeTruthy();
      expect(scope.comments.length).toEqual(2);
      expect(scope.comments[0].author).toEqual('Alice');
    }));
  });

  describe('When adding comment', function() {
    it('Should post the new comment to the server and reload the page', inject(function($httpBackend) {


      // spyOn is a jasmine mocking feature. We use it later to check the reload function has been called
      spyOn($routeMock, 'reload');

      $httpBackend.expect('POST', '/api/comments', {title: 'Title', author: 'Author', content: 'Content'}).respond({});


      scope.newComment = {title: 'Title', author: 'Author', content: 'Content'};
      scope.addComment();

      // check that reload is not called to early
      expect($routeMock.reload.calls.count()).toEqual(0);

      //
      $httpBackend.flush();
      expect($routeMock.reload).toHaveBeenCalled();
    }));
  });
});