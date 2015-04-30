describe('simpleDirective', function() {
    beforeEach(module('communicationDemo', 'myTabs'));

    it('The $templateCache has been prepopulated', inject(function($templateCache) {
        expect($templateCache.get('my-tabs.html')).toBe('<div class="tabbable"><ul class="nav nav-tabs"><li ng-repeat="pane in panes" ng-class="{active:pane.selected}"><a href="" ng-click="select(pane)">{{pane.title}}</a></li></ul><div class="tab-content" ng-transclude></div></div>');
    }));

    xit('should expand to <h3>Hello World!</h3>', inject(function($compile, $rootScope) {
        var result = $compile('<simple-directive></simple-directive>')($rootScope);
        $rootScope.name = 'World';
        $rootScope.$digest(); // the directive won't be expanded until after the digest cycle
        expect(result[0].tagName).toBe('H3');
        expect(result.text()).toBe('Hello World!');
    }));
});