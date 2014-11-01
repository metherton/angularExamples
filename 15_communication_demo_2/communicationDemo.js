(function () {
  var module = angular.module('communicationDemo', []);

  module.directive('tabMenu', function factory() {
    return {
      controller:   function tabMenuController() {
        var menuCtrl = this;
        menuCtrl.tabs = [];
        menuCtrl.activeTab = undefined;

        menuCtrl.addTab = function(tabController) {
          menuCtrl.tabs.push(tabController);
          tabController.menuController = menuCtrl;
          this[tabController.name] = tabController;
          if(!menuCtrl.activeTab) {
            menuCtrl.activateTab(tabController);
          }
        };

        menuCtrl.activateTab = function(tab) {
          if(menuCtrl.activeTab === tab) {
            return;
          }
          if(menuCtrl.activeTab) {
            menuCtrl.activeTab.active = false;
          }
          menuCtrl.activeTab = tab;
          tab.active = true;
        };

      }
      ,
      link: function tabMenuLink(scope, iElement, iAttrs, ctrl) {
        var menuName = iAttrs.tabMenu;
        scope[menuName] = ctrl;
      }
    };
  });

  module.directive('tabMenuEntry', function factory() {
    return {
      require: ['^tabMenu', 'tabMenuEntry'],
      controller: function tabMenuEntryController($scope, $element, $attrs) {
        var ctrl = this;
        ctrl.name = $attrs.tabMenuEntry;
        ctrl.active = false;
        ctrl.menuController = null;
        ctrl.activate = function() {
          ctrl.menuController.activateTab(ctrl);
        };

        $scope.$watch(function() {return ctrl.active; }, function(newValue) {
          if(newValue) {
            $element.addClass('active');
          }
          else {
            $element.removeClass('active');
          }
        });

        $element.on('click', function() {
          $scope.$apply(function() {
            ctrl.activate();
          });
        });

      },
      link: function tabMenuEntryLink(scope, iElement, iAttrs, ctrls) {
        var menuController = ctrls[0];
        var tabController = ctrls[1];
        menuController.addTab(tabController);
      }
    };
  });

  module.directive('tabPane', function factory() {
    return {
      require: '^tabMenu',
      link: function tabPaneLink(scope, iElement, iAttrs, menuController) {
        var tabName = iAttrs.tabPane;
        scope.$watch(function() {return menuController.activeTab; }, function(activeTab) {
          var show = activeTab.name === tabName;
          iElement.css('display', show ? '' : 'none');
        });
      }
    };
  });
})();
