import router from 'plugins/router';
import {TransientScope} from 'di';

export class RouteConfig {
  constructor(router){
    this.router = router;
  }
  map(routes){
    var routesProcessed = [];
    for(var i = 0; i < routes.length; i++){
      var routeProcessed = routes[i];
      routeProcessed.route = routeProcessed.pattern;
      if(!routeProcessed.moduleId && routeProcessed.componentUrl){
        routeProcessed.moduleId = routeProcessed.componentUrl;
      }
      routesProcessed.push(routeProcessed);
    }
    this.router.map(routesProcessed).buildNavigationModel();
    return this.router;
  }
}

@TransientScope
export class Router {
  constructor(){
    this.callback = ()=> {};
    this.router = router.createChildRouter()
    .makeRelative({
                    fromParent: true
                  });
  }
  configure(callback){
    this.callback = callback;
    var config = new RouteConfig(this.router);
    this.callback(config);
    return this.router;
  }
}

export class AppRouter {
  constructor(){
    this.callback = ()=> {};
    this.router = router;
  }
  configure(callback){
    this.callback = callback;
    var config = new RouteConfig(this.router);
    this.callback(config);
    return this.router;
  }
  activate(){
    return router.activate();
  }
}