import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Client, Host } from '@bbc/tools-framework';
import CustomClientInterface from './tf-launcher/CustomClientInterface';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

if (!Host.isInitialised) {
  var manifests = [
    {
        name: 'demo-activity',
        rootUrl: 'http://127.0.0.1:3001/',
        accessCheckTemplate: '',
        environment: 'int',
        activities: [{
            name: 'create-list',
            friendlyName: 'Create list TADA',
            pathTemplate: 'create-list.html',
            intentFilters: [
                {
                    actions: ['create'],
                    types: ['list'],
                },
            ],
        }],
    },
  ];

  Host.init({
      environment: 'int',
      applicationId: 'iSite',
      dev: true,
      customManifests: manifests,
  });
}

const createListIntent = Client.createIntent('create', 'list');
Client.init({
  providedIntents: [
    createListIntent,
  ],
  initCallback: (context) => {
    console.log('notifyHost');
    Client.notifyHost({
        connectedActivity: Client.fetchActivityId()
    });
  },
  dev: true,
  clientUI: CustomClientInterface(store),
  onData: function (data) {
      console.log('Client Received Data:', data);
  },
});

console.log(Client.activityInstanceId);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
