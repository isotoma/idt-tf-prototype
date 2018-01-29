import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Host } from '@bbc/tools-framework';
import CustomClientInterface from './tf-launcher/CustomClientInterface';
import Client from './tf-launcher/CustomClient';

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
        rootUrl: window.location.href,
        accessCheckTemplate: '',
        environment: 'int',
        activities: [{
            name: 'create-list',
            friendlyName: 'Create list TADA',
            pathTemplate: 'client', // No current routing so doesn't really matter
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
console.log(Client);
const createListIntent = Client.createIntent('create', 'list'); // matches manifest from above.
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
