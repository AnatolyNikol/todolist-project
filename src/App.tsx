import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolsit";
import {v1} from "uuid";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Filter = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    const [filter, setFilter] = useState<Filter>('all')

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
    }

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    const onChangeFilter = (filter: Filter) => {
        setFilter(filter)
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodolist}
                date={'30.01.2024'}
                removeTask={removeTask}
                onChangeFilter={onChangeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
