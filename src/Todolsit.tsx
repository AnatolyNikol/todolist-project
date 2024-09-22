import React, { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Checkbox, IconButton, List, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getListItemSx } from './Todolist.styles';
import { Task } from './model/tasks-reducer';
import { Filter, TodolistType } from './model/todolists-reducer';
import { FilterTasksButtons } from './FilterTasksButtons';

type Props = {
  todolist: TodolistType;
  tasks: Task[];
  date?: string;
  removeTask: (id: string, todolistId: string) => void;
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
    todolist,
    tasks,
    date,
    removeTask,
    addTask,
    changeTaskStatus,
    removeTodolist,
    updateTask,
    updateTodolist,
  } = props;

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id);
  };

  const addTaskHandler = (title: string) => {
    addTask(title, todolist.id);
  };

  const changeTitleTodolistHandler = (newTitle: string) => {
    updateTodolist(todolist.id, newTitle);
  };

  return (
    <div>
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
      <AddItemForm addItem={addTaskHandler} />
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <List>
          {tasks.map(task => {
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
      <FilterTasksButtons todolist={todolist} />
      <div>{date}</div>
    </div>
  );
};
