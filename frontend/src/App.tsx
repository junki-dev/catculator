
import Router from './routes';
import GlobalStyle from './styles/global';
import { theme } from './styles/teme';

import { ThemeProvider } from '@mui/system';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
