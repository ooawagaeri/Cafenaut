import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsTheme as Steps } from 'chakra-ui-steps';

import Login from './pages/Login';
import Register from './pages/Register';
import Reset from './pages/Reset';
import { Home } from './pages/Home';
import { CafeList } from './components/cafe/CafeList';
import { Cafe } from './components/cafe/Cafe';
import { Profile } from './pages/Profile';
import { UserContextView } from './common/UserContextView';
import Explore from './pages/Explore';

const theme = extendTheme({
  components: {
    Steps,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <UserContextView>
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cafes" element={<CafeList />} />
          <Route path="/cafe/*" element={<Cafe />} />
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/profile/*" element={<Profile />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </UserContextView>
);
