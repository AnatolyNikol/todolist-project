import React, { ChangeEvent } from 'react';
import { Checkbox, IconButton, List, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { getListItemSx } from './Todolist.styles';
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TasksState,
} from './model/tasks-reducer';
import { TodolistType } from './model/todolists-reducer';
import { EditableSpan } from './EditableSpan';

type Props = {
  todolist: TodolistType;
};

export const Tasks = (props: Props) => {
  const { todolist } = props;

  const dispatch = useDispatch();

  const tasks = useSelector<RootState, TasksState>(store => store.tasks);

  const removeTask = (id: string, todolistId: string) => {
    dispatch(removeTaskAC({ taskID: id, todolistID: todolistId }));
  };

  const changeTaskStatus = (
    taskId: string,
    taskStatus: boolean,
    todolistId: string,
  ) => {
    dispatch(
      changeTaskStatusAC({
        taskID: taskId,
        todolistID: todolistId,
        isDone: taskStatus,
      }),
    );
  };

  const updateTask = (todolistId: string, taskId: string, newTitle: string) => {
    dispatch(
      changeTaskTitleAC({
        todolistID: todolistId,
        taskID: taskId,
        title: newTitle,
      }),
    );
  };

  const allTodolistTasks = tasks[todolist.id];

  let tasksForTodolist = allTodolistTasks;

  if (todolist.filter === 'active') {
    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone);
  }

  if (todolist.filter === 'completed') {
    tasksForTodolist = allTodolistTasks.filter(task => task.isDone);
  }

  return (
    <>
      {tasksForTodolist.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <List>
          {tasksForTodolist.map(task => {
            const removeTaskHandler = () => {
              removeTask(task.id, todolist.id);
            };
            const changeTaskStatusHandler = (
              event: ChangeEvent<HTMLInputElement>,
            ) => {
              const newStatusValue = event.currentTarget.checked;
              changeTaskStatus(task.id, newStatusValue, todolist.id);
            };
            const changeTitleTaskHandler = (newTitle: string) => {
              updateTask(todolist.id, task.id, newTitle);
            };
            return (
              <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                  <Checkbox
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                  />
                  <EditableSpan
                    value={task.title}
                    onChange={changeTitleTaskHandler}
                  />
                </div>
                <IconButton title={'x'} onClick={removeTaskHandler}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
};
