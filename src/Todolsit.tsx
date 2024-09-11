import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Filter, Task} from "./App";
import {Button} from "./Button";

type Props = {
    title: string
    tasks: Task[]
    date?: string
    removeTask: (id: string) => void
    onChangeFilter: (filter: Filter) => void
    addTask: (title: string) => void
}

export const Todolist = (props: Props) => {
    const [taskTitle, setTaskTitle] = useState('')

    const {
        title,
        tasks,
        date,
        removeTask,
        onChangeFilter,
        addTask,
    } = props;

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event:  KeyboardEvent<HTMLInputElement> ) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: Filter) => {
        onChangeFilter(filter)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title={'+'}
                        onClick={addTaskHandler}
                />
            </div>
            {tasks.length === 0
                ? (
                    <p>No tasks</p>
                )
                : (
                    <ul>
                        {tasks.map(task => {
                            const removeTaskHandler = () => {
                                removeTask(task.id)
                            }
                                return (
                                    <li key={task.id}>
                                        <input type="checkbox" checked={task.isDone}/>
                                        <span>{task.title}</span>
                                        <Button title={'x'} onClick={removeTaskHandler}/>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                )}
            <div>
                <Button title={'All'} onClick={() => changeFilterTasksHandler('all')}/>
                <Button title={'Active'} onClick={() => changeFilterTasksHandler('active')}/>
                <Button title={'Completed'} onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
            <div>{date}</div>
        </div>
    )
}