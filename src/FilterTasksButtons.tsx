import { Box, Button } from '@mui/material';
import { filterButtonsContainerSx } from './Todolist.styles';
import {
  changeTodolistFilterAC,
  Filter,
  TodolistType,
} from './model/todolists-reducer';
import { useDispatch } from 'react-redux';

type Props = {
  todolist: TodolistType;
};

export const FilterTasksButtons = (props: Props) => {
  const { todolist } = props;
  const dispatch = useDispatch();
  const changeFilterTasksHandler = (filter: Filter) => {
    dispatch(
      changeTodolistFilterAC({ todolistId: todolist.id, filter: filter }),
    );
  };

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={todolist.filter === 'all' ? 'outlined' : 'text'}
        onClick={() => changeFilterTasksHandler('all')}
        color={'inherit'}
      >
        All
      </Button>
      <Button
        variant={todolist.filter === 'active' ? 'outlined' : 'text'}
        onClick={() => changeFilterTasksHandler('active')}
        color={'primary'}
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
        onClick={() => changeFilterTasksHandler('completed')}
        color={'secondary'}
      >
        Completed
      </Button>
    </Box>
  );
};
