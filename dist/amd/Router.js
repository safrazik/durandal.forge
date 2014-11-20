define(['plugins/router', 'di'], function($__0,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  var router = $__0.default;
  var TransientScope = $__2.TransientScope;
  var RouteConfig = function RouteConfig(router) {
    this.router = router;
  };
  ($traceurRuntime.createClass)(RouteConfig, {map: function(routes) {
      var routesProcessed = [];
      for (var i = 0; i < routes.length; i++) {
        var routeProcessed = routes[i];
        routeProcessed.route = routeProcessed.pattern;
        if (!routeProcessed.moduleId && routeProcessed.componentUrl) {
          routeProcessed.moduleId = routeProcessed.componentUrl;
        }
        routesProcessed.push(routeProcessed);
      }
      this.router.map(routesProcessed).buildNavigationModel();
      return this.router;
    }}, {});
  var Router = function Router() {
    this.callback = (function() {});
    this.router = router.createChildRouter().makeRelative({fromParent: true});
  };
  ($traceurRuntime.createClass)(Router, {configure: function(callback) {
      this.callback = callback;
      var config = new RouteConfig(this.router);
      this.callback(config);
      return this.router;
    }}, {});
  Object.defineProperty(Router, "annotations", {get: function() {
      return [new TransientScope];
    }});
  var AppRouter = function AppRouter() {
    this.callback = (function() {});
    this.router = router;
  };
  ($traceurRuntime.createClass)(AppRouter, {
    configure: function(callback) {
      this.callback = callback;
      var config = new RouteConfig(this.router);
      this.callback(config);
      return this.router;
    },
    activate: function() {
      return router.activate();
    }
  }, {});
  return {
    get RouteConfig() {
      return RouteConfig;
    },
    get Router() {
      return Router;
    },
    get AppRouter() {
      return AppRouter;
    },
    __esModule: true
  };
});
