import { Client } from '@bbc/tools-framework';

const customClient = {
  ...Client,
};

customClient.test = customClient.handleHandshakeResponse;
customClient.handleHandshakeResponse = data => {
    console.log('custom handleHandshakeResponse: ', data);
    customClient.test(data);
};

export default customClient;