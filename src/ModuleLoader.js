import {Provide, Injector, annotate, TransientScope} from 'di';

var _allModules = [];

var moduleInjector = new Injector(); 

var isFunction = function(param){
  return param instanceof Function;
}

function _loadModule(module, objectOnly = false){
  moduleInjector = moduleInjector.createChild(_allModules);
  if(module.inject){
    var injects = typeof module.inject === 'function' ? module.inject() : module.inject;
    annotate(module, new Inject(...injects));
  }
  var moduleInstance = moduleInjector.get(module);
  return moduleInstance;
}

export class ModuleLoader { 

  static get injector(){
    return moduleInjector;
  }

  static registerProvider(Module, module){
//    module.annotations = [
//      new Provide(Module)
//    ];
    annotate(module, new Provide(Module));
    _allModules.push(module);
  }

  static load(module){
    return ModuleLoader.loadModule(module);
  }

  static setModuleId(obj, id) {
    if(!obj){
      return; 
    }
    if (obj.__esModule && obj['default']) {
      if (typeof obj['default'] == 'function' && obj['default'].prototype) {
        obj['default'].prototype.__moduleId__ = id;
      }
      else {
        obj['default'].__moduleId__ = id;
      }
      return;
    }
    if (!obj) {
        return;
    }

    if (typeof obj == 'function' && obj.prototype) {
        obj.prototype.__moduleId__ = id;
        return;
    }

    if (typeof obj == 'string') {
        return;
    }

    obj.__moduleId__ = id;
  }

  static loadModule(module) {
    var moduleId = module.__moduleId__;
    if (module.__esModule && module['default']) {
        module = module['default'];
    }
    if (isFunction(module)) {
      module = _loadModule(module);
      return module;
    } else {
        return module;
    }
  }
  static loadObject(obj) {
    if(isFunction(obj)){
      obj = _loadModule(obj, true);
    }
    return obj;
  }

}
