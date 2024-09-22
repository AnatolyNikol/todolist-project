import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AddItemForm } from './AddItemForm';
import { useDispatch } from 'react-redux';
import { addTodolistAC } from './model/todolists-reducer';
import { Todolists } from './Todolists';

export const Main = () => {
  const dispatch = useDispatch();
  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  };

  return (
    <Container fixed>
      <Grid container sx={{ mb: '30px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>

      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  );
};
