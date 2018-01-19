import React, { Component } from 'react';
import { Client } from '@bbc/tools-framework';

import CustomClientInterface from './tf-launcher/CustomClientInterface';

import logo from './logo.svg';
import './App.css';

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
  clientUI: CustomClientInterface,
  onData: function (data) {
      console.log('Client Received Data:', data);
  },
});

console.log(Client.activityInstanceId);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <span>Trigger Messages: </span>
          <button onClick={() => {
            if (Client.activityInstanceId) {
              Client.endActivity('TEST');
            }
          }}>
            Complete and return
          </button>
          <button onClick={() => {
            if (Client.activityInstanceId) {
              Client.promptComplete('Creating Clip completed!', 123123123);
            }
          }}>
            Prompt Complete
          </button>
          <button onClick={() => {
            if (Client.activityInstanceId) {
              Client.clientUI.notifyUser('A notification to the user.', 'Error', [{label: 'Alert', onClick: () => alert('alert'), type: 'Info'}]);
            }
          }}>
            Notify User
          </button>
          <button onClick={() => {
            if (Client.activityInstanceId) {
              Client.endActivity();
            }
          }}>
            Cancel
          </button>
        </p>
        <p>
          <span>Trigger Errors: </span>
          <button onClick={() => {
            if (Client.activityInstanceId) {
              Client.notifyHost({}, 'abc');
            }
          }}>
            Send unknown message
          </button>
          <button onClick={() => {
            if (Client.activityInstanceId) {
              Client.parentWindow = null;
              Client.notifyHost();
            }
          }}>
            Loose connection to host
          </button>
        </p>
      </div>
    );
  }
}

export default App;
