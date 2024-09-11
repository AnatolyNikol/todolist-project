import React from "react";
import {Filter, Task} from "./App";
import {Button} from "./Button";

type Props = {
    title: string
    tasks: Task[]
    date?: string
    removeTask: (id: number) => void
    onChangeFilter: (filter: Filter) => void
}

export const Todolist = (props: Props) => {
    const {title, tasks, date, removeTask, onChangeFilter} = props;

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {tasks.length === 0
                ? (
                    <p>No tasks</p>
                )
                : (
                    <ul>
                        {tasks.map(task => {
                                return (
                                    <li key={task.id}>
                                        <input type="checkbox" checked={task.isDone}/>
                                        <span>{task.title}</span>
                                        <Button title={'x'} onClick={() => removeTask(task.id)}/>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                )}
            <div>
                <Button title={'All'} onClick={() => onChangeFilter('all')}/>
                <Button title={'Active'} onClick={() => onChangeFilter('active')}/>
                <Button title={'Completed'} onClick={() => onChangeFilter('completed')}/>
            </div>
            <div>{date}</div>
        </div>
    )
}