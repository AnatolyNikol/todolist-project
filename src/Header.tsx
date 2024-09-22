import { AppBar, IconButton, Toolbar, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuButton } from './MenuButton';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from './common/theme/theme';
import { RootState } from './app/store';
import { changeThemeAC, ThemeMode } from './app/app-reducer';

export const Header = () => {
  const themeMode = useSelector<RootState, ThemeMode>(
    store => store.app.themeMode,
  );
  const dispatch = useDispatch();

  const theme = getTheme(themeMode);

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode == 'light' ? 'dark' : 'light'));
  };
  return (
    <AppBar position={'static'} sx={{ mb: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          <MenuButton color="inherit">Login</MenuButton>
          <MenuButton color="inherit">Logout</MenuButton>
          <MenuButton color="inherit" background={theme.palette.primary.main}>
            Faq
          </MenuButton>
          <Switch color={'default'} onChange={changeModeHandler} />
        </div>
      </Toolbar>
    </AppBar>
  );
};
