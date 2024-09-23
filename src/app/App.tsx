import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from '../common/theme/theme';
import { Header } from '../common/components/Header';
import { Main } from './Main';
import { useAppSelector } from '../common/hooks/useAppSelector';
import { selectThemeMode } from './appSelectors';

function AppWithRedux() {
  const themeMode = useAppSelector(selectThemeMode);

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  );
}

export default AppWithRedux;
