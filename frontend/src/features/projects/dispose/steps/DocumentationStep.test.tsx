import React from 'react';
import renderer from 'react-test-renderer';
import DocumentationStep from './DocumentationStep';
import * as reducerTypes from 'constants/reducerTypes';
import { createMemoryHistory } from 'history';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { render } from '@testing-library/react';
import { DisposeWorkflowStatus, IProjectTask } from '../interfaces';

const mockAxios = new MockAdapter(axios);
mockAxios.onAny().reply(200, {});

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const tasks: IProjectTask[] = [
  {
    projectNumber: 1,
    isCompleted: true,
    isOptional: true,
    completedOn: new Date(),
    taskId: 1,
    name: 'task-0',
    sortOrder: 0,
    description: 'Task #1',
    taskType: 1,
    statusId: DisposeWorkflowStatus.RequiredDocumentation,
  },
  {
    projectNumber: 1,
    isCompleted: true,
    isOptional: true,
    completedOn: new Date(),
    taskId: 2,
    name: 'task-1',
    sortOrder: 0,
    description: 'Task #2',
    taskType: 1,
    statusId: DisposeWorkflowStatus.RequiredDocumentation,
  },
];

const store = mockStore({
  [reducerTypes.ProjectReducers.PROJECT]: { project: { tasks: tasks } },
  [reducerTypes.ProjectReducers.TASKS]: tasks,
});

const uiElement = (
  <Provider store={store}>
    <Router history={history}>
      <DocumentationStep />
    </Router>
  </Provider>
);

it('renders correctly', () => {
  const tree = renderer.create(uiElement).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correct labels', () => {
  const { getByText } = render(uiElement);
  expect(getByText('Task #1')).toBeInTheDocument();
  expect(getByText('Task #2')).toBeInTheDocument();
});