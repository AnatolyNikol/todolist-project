import { ChangeEvent } from 'react';
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TaskType,
} from './features/todolists/ui/model/tasks-reducer';
import { TodolistType } from './features/todolists/ui/model/todolists-reducer';
import { Checkbox, IconButton, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from './common/components/EditableSpan';
import { getListItemSx } from './features/todolists/ui/Todolists/Todolist/Tasks/Task.styles';
import { useAppDispatch } from './common/hooks/useAppDispatch';

type Props = {
  task: TaskType;
  todolist: TodolistType;
};

export const Task = (props: Props) => {
  const { task, todolist } = props;

  const dispatch = useAppDispatch();

  const removeTaskHandler = () => {
    dispatch(removeTaskAC({ taskID: task.id, todolistID: todolist.id }));
  };
  const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeTaskStatusAC({
        taskID: task.id,
        todolistID: todolist.id,
        isDone: event.currentTarget.checked,
      }),
    );
  };
  const changeTitleTaskHandler = (newTitle: string) => {
    dispatch(
      changeTaskTitleAC({
        todolistID: todolist.id,
        taskID: task.id,
        title: newTitle,
      }),
    );
  };
  return (
    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTitleTaskHandler} />
      </div>
      <IconButton title={'x'} onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
