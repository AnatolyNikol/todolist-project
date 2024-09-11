import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolsit";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Filter = 'all' | 'active' | 'completed'

type Todolist = {
    id: string,
    title: string,
    filter: Filter
}

type TasksState = {
    [key: string]: Task[]
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const [todolists, setTodolists] = useState<Todolist[]>([
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
        const newTodolists  = todolists.filter(todolist => todolist.id !== todolistId)
        setTodolists(newTodolists)

        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const newTodolist: Todolist = {id: v1(), title: title, filter: 'all'}
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

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(todolist => {

                    const allTodolistTasks = tasks[todolist.id]
                    let tasksForTodolist = allTodolistTasks

                    if (todolist.filter === 'active') {
                        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                    }

                    if (todolist.filter === 'completed') {
                        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                    }

                    return <Todolist
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
            }
            )}
        </div>
    );
}

export default App;
