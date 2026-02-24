import { Adaptable } from '@adaptabletools/adaptable';

import { themeQuartz } from 'ag-grid-enterprise';

import './style.css';

import { columnDefs, defaultColDef } from './columnDefs';
import { rowData } from './rowData';
import { agGridModules } from './agGridModules';

const adaptableOptions = {
  primaryKey: 'id',
  userName: 'support user',
  adaptableId: 'AdapTable VanillaJS Support Template',
  initialState: {
    Dashboard: {
      Tabs: [
        {
          Name: 'Home',
          Toolbars: ['Layout'],
        },
      ],
    },
    Layout: {
      Revision: Date.now(),
      CurrentLayout: 'Basic',
      Layouts: [
        {
          Name: 'Basic',
          TableColumns: [
            'name',
            'language',
            'github_stars',
            'license',
            'week_issue_change',
            'created_at',
            'has_wiki',
            'updated_at',
            'pushed_at',
            'github_watchers',
            'description',
            'open_issues_count',
            'closed_issues_count',
            'open_pr_count',
            'closed_pr_count',
          ],
        },
        {
          Name: 'Pivot',
          PivotColumns: ['language'],
          PivotGroupedColumns: ['license', 'has_wiki'],
          PivotAggregationColumns: [
            {
              ColumnId: 'github_stars',
              AggFunc: 'sum',
            },
            {
              ColumnId: 'open_issues_count',
              AggFunc: 'sum',
            },
            {
              ColumnId: 'open_pr_count',
              AggFunc: 'sum',
            },
            {
              ColumnId: 'closed_pr_count',
              AggFunc: 'sum',
            },
          ],
        },
      ],
    },
  },
};

const gridOptions = {
  defaultColDef,
  columnDefs,
  rowData,
  theme: themeQuartz,
};

const agGridConfig = {
  modules: agGridModules,
  gridOptions: gridOptions,
};

Adaptable.init(adaptableOptions, agGridConfig).then((api) => {
  console.log('AdapTable ready!');
});
