define(['durandal/system', 'durandal/app', 'knockout', 'durandal.punches', './ModuleLoader'], function($__0,$__2,$__4,$__6,$__8) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  if (!$__6 || !$__6.__esModule)
    $__6 = {default: $__6};
  if (!$__8 || !$__8.__esModule)
    $__8 = {default: $__8};
  var system = $__0.default;
  var app = $__2.default;
  var ko = $__4.default;
  var durandalPunches = $__6.default;
  var ModuleLoader = $__8.ModuleLoader;
  var Application = function Application() {};
  ($traceurRuntime.createClass)(Application, {init: function(providers, filters) {
      if (providers) {
        providers.forEach(function(value, key) {
          ModuleLoader.registerProvider(key, value);
        });
      }
      if (filters) {
        for (var name in filters) {
          ko.filters[name] = filters[name];
        }
      }
      system.resolveObject = ModuleLoader.load;
      system.setModuleId = ModuleLoader.setModuleId;
      ko.punches.enableAll();
      var oldStart = app.start;
      app.start = function() {
        app.configurePlugins({
          router: true,
          observable: true
        });
        return new Promise((function(resolve, reject) {
          oldStart().then(function() {
            ko.bindingHandlers.viewPort = ko.bindingHandlers.routerViewPort = ko.bindingHandlers.router;
            resolve();
          }, reject);
        }));
      };
    }}, {});
  return {
    get Application() {
      return Application;
    },
    __esModule: true
  };
});
