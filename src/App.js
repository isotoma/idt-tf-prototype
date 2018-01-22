import React, { Component } from 'react';
import { Client, Host, ModalLauncher, IntGelDrawerLauncher, NewTabLauncher } from '@bbc/tools-framework';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            {!Client.activityInstanceId && 'Host'}
            {Client.activityInstanceId && 'Client'}
          </h1>
        </header>
        {Client.activityInstanceId &&
          <div>
            <p className="App-intro">
              <span>Trigger Messages: </span>
              <button onClick={() => Client.endActivity('TEST')}>
                Complete and return
              </button>
              <button onClick={() => Client.promptComplete('Creating Clip completed!', 123123123)}>
                Prompt Complete
              </button>
              <button onClick={() => Client.clientUI.notifyUser('A notification to the user.', 'Error', [{label: 'Alert', onClick: () => alert('alert'), type: 'Info'}])}>
                Notify User
              </button>
              <button onClick={() => Client.endActivity()}>
                Cancel
              </button>
            </p>
            <p>
              <span>Trigger Errors: </span>
              <button onClick={() => Client.notifyHost({}, 'abc')}>
                Send unknown message
              </button>
              <button onClick={() => {
                Client.parentWindow = null;
                Client.notifyHost();
              }}>
                Loose connection to host
              </button>
            </p>
          </div>
        }
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
            New Activity in Modal
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
              launcher: new IntGelDrawerLauncher(),
              query: {
                param1: 'value1',
                param3: 'value3',
              },
              disableVersionCheck: true
            });
          }}>
            New Activity in Drawer
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
              launcher: new NewTabLauncher(),
              query: {
                param1: 'value1',
                param3: 'value3',
              },
              disableVersionCheck: true
            });
          }}>
            New Activity in New Tab
          </button>
        </p>
      </div>
    );
  }
}

export default App;
