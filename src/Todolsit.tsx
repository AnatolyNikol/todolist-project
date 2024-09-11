import React from "react";
import {Task} from "./App";
import {Button} from "./Button";

type Props = {
    title: string
    tasks: Task[]
    date?: string
}

export const Todolist = (props: Props) => {
    const {title, tasks, date} = props;

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
                                    <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                                        <span>{task.title}</span></li>
                                )
                            }
                        )}
                    </ul>
                )}
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
            <div>{date}</div>
        </div>
    )
}