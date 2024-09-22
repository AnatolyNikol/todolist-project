import { Container, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AddItemForm } from './AddItemForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  Filter,
  removeTodolistAC,
  TodolistType,
} from './model/todolists-reducer';
import { RootState } from './app/store';
import { Todolist } from './Todolsit';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TasksState,
} from './model/tasks-reducer';

export const Main = () => {
  const todolists = useSelector<RootState, TodolistType[]>(
    store => store.todolists,
  );
  const tasks = useSelector<RootState, TasksState>(store => store.tasks);
  const dispatch = useDispatch();
  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  };
  const removeTask = (id: string, todolistId: string) => {
    dispatch(removeTaskAC({ taskID: id, todolistID: todolistId }));
  };

  const onChangeFilter = (filter: Filter, todolistId: string) => {
    dispatch(
      changeTodolistFilterAC({ todolistId: todolistId, filter: filter }),
    );
  };

  const addTask = (title: string, todolistId: string) => {
    dispatch(addTaskAC({ todolistID: todolistId, title: title }));
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

  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatch(action);
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

  const updateTodolist = (todolistId: string, newTitle: string) => {
    dispatch(
      changeTodolistTitleAC({ todolistId: todolistId, title: newTitle }),
    );
  };
  return (
    <Container fixed>
      <Grid container sx={{ mb: '30px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>

      <Grid container spacing={4}>
        {todolists.map(todolist => {
          const allTodolistTasks = tasks[todolist.id];
          let tasksForTodolist = allTodolistTasks;

          if (todolist.filter === 'active') {
            tasksForTodolist = allTodolistTasks.filter(task => !task.isDone);
          }

          if (todolist.filter === 'completed') {
            tasksForTodolist = allTodolistTasks.filter(task => task.isDone);
          }

          return (
            <Grid key={todolist.id}>
              <Paper sx={{ p: '0 20px 20px 20px' }}>
                <Todolist
                  todolistId={todolist.id}
                  key={todolist.id}
                  title={todolist.title}
                  tasks={tasksForTodolist}
                  filter={todolist.filter}
                  removeTask={removeTask}
                  onChangeFilter={onChangeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  removeTodolist={removeTodolist}
                  updateTask={updateTask}
                  updateTodolist={updateTodolist}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
