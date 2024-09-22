import { List } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { TasksState } from './model/tasks-reducer';
import { TodolistType } from './model/todolists-reducer';
import { Task } from './Task';

type Props = {
  todolist: TodolistType;
};

export const Tasks = (props: Props) => {
  const { todolist } = props;

  const tasks = useSelector<RootState, TasksState>(store => store.tasks);

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
            return <Task key={task.id} task={task} todolist={todolist} />;
          })}
        </List>
      )}
    </>
  );
};
