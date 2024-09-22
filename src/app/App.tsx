import './App.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { getTheme } from '../common/theme/theme';
import { Header } from '../Header';
import { Main } from '../Main';
import { ThemeMode } from './app-reducer';

function AppWithRedux() {
  const themeMode = useSelector<RootState, ThemeMode>(
    store => store.app.themeMode,
  );

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  );
}

export default AppWithRedux;
