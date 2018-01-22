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
        <div>
          <h2>Host Things</h2>
          <button onClick={() => {
            const currentActivity = Host.startActivity('demo-activity:create-list', {
              onComplete: (data) => {
                console.log('Host onComplete:' + data);
              },
              onData: (data) => {
                console.log('Host onData:' + data);
                if (currentActivity) {
                  console.log('notifyClient');
                  Host.notifyClient(currentActivity, 'test');
                }
              },
              onError: (error) => {
                console.log('Host onError:' + error);
              },
              launcher: new ModalLauncher(),
              disableVersionCheck: true
            });
          }}>
            New Activity in Modal
          </button>
          <button onClick={() => {
            const currentActivity = Host.startActivity('demo-activity:create-list', {
              onComplete: (data) => {
                console.log('Host onComplete:' + data);
              },
              onData: (data) => {
                console.log('Host onData:' + data);
                if (currentActivity) {
                  console.log('notifyClient');
                  Host.notifyClient(currentActivity, 'test');
                }
              },
              onError: (error) => {
                console.log('Host onError:' + error);
              },
              launcher: new IntGelDrawerLauncher(),
              disableVersionCheck: true
            });
          }}>
            New Activity in Drawer
          </button>
          <button onClick={() => {
            const currentActivity = Host.startActivity('demo-activity:create-list', {
              onComplete: (data) => {
                console.log('Host onComplete:' + data);
              },
              onData: (data) => {
                console.log('Host onData:' + data);
                if (currentActivity) {
                  console.log('notifyClient');
                  Host.notifyClient(currentActivity, 'test');
                }
              },
              onError: (error) => {
                console.log('Host onError:' + error);
              },
              launcher: new NewTabLauncher(),
              disableVersionCheck: true
            });
          }}>
            New Activity in New Tab
          </button>
        </div>
        {Client.activityInstanceId &&
          <div>
            <h2>Client Things</h2>
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
      </div>
    );
  }
}

export default App;
