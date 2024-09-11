import React from 'react';
import './App.css';
import {Todolist} from "./Todolsit";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const task1: Task[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ]

    const task2: Task[] = []


    return (
        <div className="App">
            <Todolist title='What to learn' tasks={task1} date={'30.01.2024'}/>
            <Todolist title='Songs' tasks={task2}/>
        </div>
    );
}

export default App;
