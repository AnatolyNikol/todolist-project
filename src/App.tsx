import React, {useState} from 'react';
import './App.css';
import {TodolistType} from "./model/todolists-reducer";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Container,
    createTheme,
    IconButton,
    Paper,
    Toolbar,
    ThemeProvider,
    CssBaseline,
    Switch
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from "./MenuButton";
import {Todolist} from "./Todolsit";
import {TasksState} from "./model/tasks-reducer";

export type Filter = 'all' | 'active' | 'completed'

type ThemeMode = 'light' | 'dark'

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4'
            }
        }
    });

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
            [todolistID1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
            ],
            [todolistID2]: [
                {id: v1(), title: 'Rest API', isDone: true},
                {id: v1(), title: 'GraphQL', isDone: true},
            ]
        }
    )

    const removeTask = (id: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)})

    }

    const onChangeFilter = (filter: Filter, todolistId: string) => {
        const newTodolists = todolists.map(todolist => todolist.id === todolistId
            ? {...todolist, filter: filter}
            : todolist
        )
        setTodolists(newTodolists)
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId
                ? {...task, isDone: taskStatus}
                : task)
        })
    }

    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(todolist => todolist.id !== todolistId)
        setTodolists(newTodolists)

        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const newTodolist: TodolistType = {id: v1(), title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])

        setTasks({...tasks, [newTodolist.id]: []})
    }

    const updateTask = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId
                ? {...task, title: newTitle}
                : task)
        })
    }

    const updateTodolist = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title: newTitle} : todolist))
    }

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position={'static'} sx={{mb: '30px'}} >
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color='inherit'>
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton color='inherit'>Login</MenuButton>
                        <MenuButton color='inherit'>Logout</MenuButton>
                        <MenuButton color='inherit' background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler}/>
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{mb: '30px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={4}>
                    {todolists.map(todolist => {

                            const allTodolistTasks = tasks[todolist.id]
                            let tasksForTodolist = allTodolistTasks

                            if (todolist.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                            }

                            if (todolist.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                            }

                            return (
                                <Grid>
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
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

                            )
                        }
                    )}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App;
