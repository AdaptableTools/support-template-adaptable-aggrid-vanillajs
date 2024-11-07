import './style.css';

import Adaptable from '@adaptabletools/adaptable/agGrid';

import { columnDefs, defaultColDef } from './columnDefs';
import { rowData } from './rowData';
import { agGridModules } from './agGridModules';

// Build the AdaptableOptions object and set primaryKey and adaptableId
// In this example we are NOT creating any predefined config nor providing any Adaptable Options classes (e.g. filters, entitlements)
// However in the real world you will set up AdapTable Options to fit your requirements and configure your permissions and remote State
// You will also provide Predefined Config so that AdapTable ships for first time use with your required objects
const adaptableOptions = {
  primaryKey: 'id',
  userName: 'support user',
  adaptableId: 'AdapTable VanillaJS Support Template',
  // Typically you will store State remotely; here we simply leverage local storage for convenience
  stateOptions: {
    persistState: (state, adaptableStateFunctionConfig) => {
      localStorage.setItem(adaptableStateFunctionConfig.adaptableStateKey, JSON.stringify(state));
      return Promise.resolve(true);
    },
    loadState: (config) => {
      return new Promise((resolve) => {
        let state = {};
        try {
          state = JSON.parse(localStorage.getItem(config.adaptableStateKey)) || {};
        } catch (err) {
          console.log('Error loading state', err);
        }
        resolve(state);
      });
    },
  },
  predefinedConfig: {
    // put here your custom Adaptable State
  },
};

// Create an AG Grid GridOptions object with the Column Definitions and Row Data created above
const gridOptions = {
  defaultColDef,
  columnDefs,
  rowData,
};

// Create an AG Grid Config object which contains AG Grid Grid Options and Modules
const agGridConfig = {
  modules: agGridModules,
  gridOptions: gridOptions,
};

// Asynchronously instantiate AdapTable with Adaptable Options and AG Grid Config
Adaptable.init(adaptableOptions, agGridConfig).then((api) => {
  console.log('AdapTable ready!');
});
