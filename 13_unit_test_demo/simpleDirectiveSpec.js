describe('simpleDirective', function() {

    var $compile, $rootScope;

    beforeEach(module('simpleDirective'));
    beforeEach(module('simpleDirectiveTemplate.html'));
    beforeEach(inject(function(_$rootScope_, _$compile_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

      it('The $templateCache has been prepopulated', inject(function($templateCache) {
        var element = expect($templateCache.get('simpleDirectiveTemplate.html')).toBe('<h3>Hello {{name}}!</h3>');
      }));

  xit('should expand to <h3>Hello World!</h3>', function() {
    var result = $compile('<simple-directive></simple-directive>')($rootScope);
    $rootScope.name = 'World';
    $rootScope.$digest(); // the directive won't be expanded until after the digest cycle
    expect(result[0].tagName).toBe('H3');
    expect(result.text()).toBe('Hello World!');
  });

  it('should pas', function() {
      expect(2).toBe(2);
  });

});