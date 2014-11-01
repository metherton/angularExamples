describe('e2e demo', function() {
  browser.get('index.html');

  describe('simpleDirective', function() {
    it('should display the value of the name property', function() {
      element(by.model('name')).sendKeys('World');
      var greeting = element(by.binding('name'));
      expect(greeting.getText()).toBe('Hello World!');
    });
  })
});