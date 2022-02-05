import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Connector } from 'mqtt-react-hooks';
import App from './App';
import theme from './theme';

const options = {
	protocol: 'mqtt',
	clientId: 'b0908853',
  username: 'Ameen123',
  password: 'aio_mOzZ04hm3vpuv5Glc3zXV0Yk5auv'
};
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Connector brokerUrl="mqtt://pudiyap.ddns.net:8082" options={options as any}>
      <App />
    </Connector>
  </ThemeProvider>,
  document.querySelector('#root'),
);

