describe('simpleDirective', function() {
  beforeEach(module('templates', 'simpleDirective'));

  it('The $templateCache has been prepopulated', inject(function($templateCache) {
    expect($templateCache.get('simpleDirectiveTemplate.html')).toBe('<h3>Hello {{name}}!</h3>');
  }));

  it('should expand to <h3>Hello World!</h3>', inject(function($compile, $rootScope) {
    var result = $compile('<simple-directive></simple-directive>')($rootScope);
    $rootScope.name = 'World';
    $rootScope.$digest(); // the directive won't be expanded until after the digest cycle
    expect(result[0].tagName).toBe('H3');
    expect(result.text()).toBe('Hello World!');
  }));
});