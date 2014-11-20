import {ModuleLoader} from './ModuleLoader';
import {Application} from './Application';

export {Router} from './Router';
export {AppRouter} from './Router';

export {ModuleLoader};

export var load = ModuleLoader.load;

export function init(providers, filters){
  var app = ModuleLoader.load(Application);
  return app.init(providers, filters);
}