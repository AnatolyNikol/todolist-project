import React, { useReducer, useState } from 'react';
import './App.css';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
  TodolistType,
} from './model/todolists-reducer';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import {
  AppBar,
  Container,
  createTheme,
  IconButton,
  Paper,
  Toolbar,
  ThemeProvider,
  CssBaseline,
  Switch,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuButton } from './MenuButton';
import { Todolist } from './Todolsit';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
  TasksState,
} from './model/tasks-reducer';

export type Filter = 'all' | 'active' | 'completed';

type ThemeMode = 'light' | 'dark';

function AppWithReducers() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#087EA4',
      },
    },
  });

  const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ]);

  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: true },
    ],
  });

  const removeTask = (id: string, todolistId: string) => {
    dispatchTasks(removeTaskAC({ taskID: id, todolistID: todolistId }));
  };

  const onChangeFilter = (filter: Filter, todolistId: string) => {
    dispatchTodolists(changeTodolistFilterAC({ todolistId, filter }));
  };

  const addTask = (title: string, todolistId: string) => {
    dispatchTasks(addTaskAC({ todolistID: todolistId, title: title }));
  };

  const changeTaskStatus = (
    taskId: string,
    taskStatus: boolean,
    todolistId: string,
  ) => {
    dispatchTasks(
      changeTaskStatusAC({
        taskID: taskId,
        todolistID: todolistId,
        isDone: taskStatus,
      }),
    );
  };

  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatchTodolists(action);
    dispatchTasks(action);
  };

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatchTodolists(action);
    dispatchTasks(action);
  };

  const updateTask = (todolistId: string, taskId: string, newTitle: string) => {
    dispatchTasks(
      changeTaskTitleAC({
        todolistID: todolistId,
        taskID: taskId,
        title: newTitle,
      }),
    );
  };

  const updateTodolist = (todolistId: string, newTitle: string) => {
    dispatchTodolists(changeTodolistTitleAC({ todolistId, title: newTitle }));
  };

  const changeModeHandler = () => {
    setThemeMode(themeMode == 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position={'static'} sx={{ mb: '30px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <MenuButton color="inherit">Login</MenuButton>
            <MenuButton color="inherit">Logout</MenuButton>
            <MenuButton color="inherit" background={theme.palette.primary.dark}>
              Faq
            </MenuButton>
            <Switch color={'default'} onChange={changeModeHandler} />
          </div>
        </Toolbar>
      </AppBar>
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
              <Grid>
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
    </ThemeProvider>
  );
}

export default AppWithReducers;
