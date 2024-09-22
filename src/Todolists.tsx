import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { addTaskAC } from './model/tasks-reducer';
import {
  changeTodolistTitleAC,
  removeTodolistAC,
  TodolistType,
} from './model/todolists-reducer';
import Grid from '@mui/material/Grid2';
import { Paper } from '@mui/material';
import { Todolist } from './Todolsit';

export const Todolists = () => {
  const todolists = useSelector<RootState, TodolistType[]>(
    store => store.todolists,
  );

  const dispatch = useDispatch();

  const addTask = (title: string, todolistId: string) => {
    dispatch(addTaskAC({ todolistID: todolistId, title: title }));
  };

  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatch(action);
  };

  const updateTodolist = (todolistId: string, newTitle: string) => {
    dispatch(
      changeTodolistTitleAC({ todolistId: todolistId, title: newTitle }),
    );
  };

  return todolists.map(todolist => {
    return (
      <Grid key={todolist.id}>
        <Paper sx={{ p: '0 20px 20px 20px' }}>
          <Todolist
            key={todolist.id}
            todolist={todolist}
            addTask={addTask}
            removeTodolist={removeTodolist}
            updateTodolist={updateTodolist}
          />
        </Paper>
      </Grid>
    );
  });
};
