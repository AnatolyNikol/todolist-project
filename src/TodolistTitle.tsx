import { IconButton } from '@mui/material';
import { EditableSpan } from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  changeTodolistTitleAC,
  removeTodolistAC,
  TodolistType,
} from './model/todolists-reducer';
import { useDispatch } from 'react-redux';

type Props = {
  todolist: TodolistType;
};

export const TodolistTitle = (props: Props) => {
  const { todolist } = props;

  const dispatch = useDispatch();

  const changeTitleTodolistHandler = (newTitle: string) => {
    dispatch(
      changeTodolistTitleAC({ todolistId: todolist.id, title: newTitle }),
    );
  };

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(todolist.id));
  };

  return (
    <div className="todolist-title-container">
      <h3>
        <EditableSpan
          value={todolist.title}
          onChange={changeTitleTodolistHandler}
        />
      </h3>
      <IconButton title={'x'} onClick={removeTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
