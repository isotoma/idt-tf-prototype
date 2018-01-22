import React, { Component } from 'react';
import { Client, Host, ModalLauncher } from '@bbc/tools-framework';

import logo from './logo.svg';
import './App.css';

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
        <p>
          <button onClick={() => {
            const currentActivity = Host.startActivity('demo-activity:create-list', {
              onComplete: () => {},
              onData: (data) => {
                console.log('Host Received Data:' + data);
                if (currentActivity) {
                  console.log('notifyClient');
                  Host.notifyClient(currentActivity, 'test');
                }
              },
              onError: (error) => {
                console.log('Host received error:' + error);
              },
              launcher: new ModalLauncher(),
              query: {
                param1: 'value1',
                param3: 'value3',
              },
              disableVersionCheck: true
            });
          }}>
            New Activity
          </button>
        </p>
      </div>
    );
  }
}

export default App;
