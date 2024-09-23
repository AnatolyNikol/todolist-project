import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from '../common/theme/theme';
import { Header } from '../common/components/Header';
import { Main } from './Main';
import { useAppSelector } from '../common/hooks/useAppSelector';

function AppWithRedux() {
  const themeMode = useAppSelector(store => store.app.themeMode);

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  );
}

export default AppWithRedux;
