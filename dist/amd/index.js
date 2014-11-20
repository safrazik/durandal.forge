define(['./ModuleLoader', './Application', './Router', './Router'], function($__0,$__2,$__4,$__5) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  if (!$__5 || !$__5.__esModule)
    $__5 = {default: $__5};
  var ModuleLoader = $__0.ModuleLoader;
  var Application = $__2.Application;
  var $__Router__ = $__4;
  var $__Router__ = $__5;
  ;
  var load = ModuleLoader.load;
  function init(providers, filters) {
    var app = ModuleLoader.load(Application);
    return app.init(providers, filters);
  }
  return {
    get Router() {
      return $__Router__.Router;
    },
    get AppRouter() {
      return $__Router__.AppRouter;
    },
    get ModuleLoader() {
      return ModuleLoader;
    },
    get load() {
      return load;
    },
    get init() {
      return init;
    },
    __esModule: true
  };
});
