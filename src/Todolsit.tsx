import React, { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { filterButtonsContainerSx, getListItemSx } from './Todolist.styles';
import { Task } from './model/tasks-reducer';
import { Filter } from './model/todolists-reducer';

type Props = {
  todolistId: string;
  title: string;
  tasks: Task[];
  date?: string;
  filter: Filter;
  removeTask: (id: string, todolistId: string) => void;
  onChangeFilter: (filter: Filter, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    taskStatus: boolean,
    todolistId: string,
  ) => void;
  removeTodolist: (todolistId: string) => void;
  updateTask: (todolistId: string, taskId: string, newTitle: string) => void;
  updateTodolist: (todolistId: string, newTitle: string) => void;
};

export const Todolist = (props: Props) => {
  const {
    todolistId,
    title,
    tasks,
    date,
    removeTask,
    onChangeFilter,
    addTask,
    changeTaskStatus,
    filter,
    removeTodolist,
    updateTask,
    updateTodolist,
  } = props;

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  const changeFilterTasksHandler = (filter: Filter, todolistId: string) => {
    onChangeFilter(filter, todolistId);
  };

  const addTaskHandler = (title: string) => {
    addTask(title, todolistId);
  };

  const changeTitleTodolistHandler = (newTitle: string) => {
    updateTodolist(todolistId, newTitle);
  };

  return (
    <div>
      <div className="todolist-title-container">
        <h3>
          <EditableSpan value={title} onChange={changeTitleTodolistHandler} />
        </h3>
        <IconButton title={'x'} onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
      <AddItemForm addItem={addTaskHandler} />
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <List>
          {tasks.map(task => {
            const removeTaskHandler = () => {
              removeTask(task.id, todolistId);
            };
            const changeTaskStatusHandler = (
              event: ChangeEvent<HTMLInputElement>,
            ) => {
              const newStatusValue = event.currentTarget.checked;
              changeTaskStatus(task.id, newStatusValue, todolistId);
            };
            const changeTitleTaskHandler = (newTitle: string) => {
              updateTask(todolistId, task.id, newTitle);
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
      <Box sx={filterButtonsContainerSx}>
        <Button
          variant={filter === 'all' ? 'outlined' : 'text'}
          onClick={() => changeFilterTasksHandler('all', todolistId)}
          color={'inherit'}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'outlined' : 'text'}
          onClick={() => changeFilterTasksHandler('active', todolistId)}
          color={'primary'}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'outlined' : 'text'}
          onClick={() => changeFilterTasksHandler('completed', todolistId)}
          color={'secondary'}
        >
          Completed
        </Button>
      </Box>
      <div>{date}</div>
    </div>
  );
};
