import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Filter, Task} from "./App";
import {Button} from "./Button";

type Props = {
    title: string
    tasks: Task[]
    date?: string
    filter: Filter
    removeTask: (id: string) => void
    onChangeFilter: (filter: Filter) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
}

export const Todolist = (props: Props) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null);

    const {
        title,
        tasks,
        date,
        removeTask,
        onChangeFilter,
        addTask,
        changeTaskStatus,
        filter,
    } = props;

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event:  KeyboardEvent<HTMLInputElement> ) => {
        setError(null)
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
                    className={error ? 'error' : ''}
                />
                <Button title={'+'}
                        onClick={addTaskHandler}
                />
            </div>
            {error && <span className='error-message'>{error}</span>}
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
                            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = event.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue)
                            }
                                return (
                                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                        <span>{task.title}</span>
                                        <Button title={'x'} onClick={removeTaskHandler}/>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                )}
            <div>
                <Button
                    title={'All'}
                    onClick={() => changeFilterTasksHandler('all')}
                    className={filter === 'all' ? 'active-filter' : ''}
                />
                <Button
                    title={'Active'}
                    onClick={() => changeFilterTasksHandler('active')}
                    className={filter === 'active' ? 'active-filter' : ''}
                />
                <Button
                    title={'Completed'}
                    onClick={() => changeFilterTasksHandler('completed')}
                    className={filter === 'completed' ? 'active-filter' : ''}
                />
            </div>
            <div>{date}</div>
        </div>
    )
}