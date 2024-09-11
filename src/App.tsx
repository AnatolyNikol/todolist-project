import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolsit";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export type Filter = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ])

    const [filter, setFilter] = useState<Filter>('all')

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
    }

    const removeTask = (id: number) => {
        const filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    const onChangeFilter = (filter: Filter) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodolist}
                date={'30.01.2024'}
                removeTask={removeTask}
                onChangeFilter={onChangeFilter}
            />
        </div>
    );
}

export default App;
