import system from 'durandal/system';
import app from 'durandal/app';
import ko from 'knockout';
import durandalPunches from 'durandal.punches';

import {ModuleLoader} from './ModuleLoader';

export class Application {

  init(providers, filters){
    if(providers){
      providers.forEach(function(value, key){
        ModuleLoader.registerProvider(key, value);
      });
    }
    if(filters){
      for(var name in filters){
        ko.filters[name] = filters[name];
      }
    }
    system.resolveObject = ModuleLoader.load;
    system.setModuleId = ModuleLoader.setModuleId;
    ko.punches.enableAll();
    var oldStart = app.start;
    app.start = function(){
      app.configurePlugins({
          router:true,
          observable: true
      });
      return new Promise((resolve, reject)=> {
        oldStart().then(function(){
          ko.bindingHandlers.viewPort
            = ko.bindingHandlers.routerViewPort = ko.bindingHandlers.router;
          resolve();
        }, reject);
      });
    };
  }
}
