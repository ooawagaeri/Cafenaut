import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsTheme as Steps } from 'chakra-ui-steps';

import Login from './pages/Login';
import Register from './pages/Register';
import Reset from './pages/Reset';
import Dashboard from './pages/Dashboard';

const theme = extendTheme({
  components: {
    Steps,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </StrictMode>
);
