define(['di'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var $__1 = $__0,
      Provide = $__1.Provide,
      Injector = $__1.Injector,
      annotate = $__1.annotate,
      TransientScope = $__1.TransientScope;
  var _allModules = [];
  var moduleInjector = new Injector();
  var isFunction = function(param) {
    return param instanceof Function;
  };
  function _loadModule(module) {
    var objectOnly = arguments[1] !== (void 0) ? arguments[1] : false;
    moduleInjector = moduleInjector.createChild(_allModules);
    var moduleInstance = moduleInjector.get(module);
    return moduleInstance;
  }
  var ModuleLoader = function ModuleLoader() {};
  var $ModuleLoader = ModuleLoader;
  ($traceurRuntime.createClass)(ModuleLoader, {}, {
    get injector() {
      return moduleInjector;
    },
    registerProvider: function(Module, module) {
      annotate(module, new Provide(Module));
      _allModules.push(module);
    },
    load: function(module) {
      return $ModuleLoader.loadModule(module);
    },
    setModuleId: function(obj, id) {
      if (!obj) {
        return;
      }
      if (obj.__esModule && obj['default']) {
        if (typeof obj['default'] == 'function' && obj['default'].prototype) {
          obj['default'].prototype.__moduleId__ = id;
        } else {
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
    },
    loadModule: function(module) {
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
    },
    loadObject: function(obj) {
      if (isFunction(obj)) {
        obj = _loadModule(obj, true);
      }
      return obj;
    }
  });
  return {
    get ModuleLoader() {
      return ModuleLoader;
    },
    __esModule: true
  };
});
