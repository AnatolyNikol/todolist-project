import React, {ChangeEvent} from "react";
import {Filter, Task} from "./App";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type Props = {
    todolistId: string
    title: string
    tasks: Task[]
    date?: string
    filter: Filter
    removeTask: (id: string, todolistId: string) => void
    onChangeFilter: (filter: Filter, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolist: (todolistId: string, newTitle: string) => void
}

export const Todolist = (props: Props) => {

    const {
        todolistId,
        title,
        tasks,
        date,
        removeTask,
        onChangeFilter,
        addTask,
        changeTaskStatus,
        filter,
        removeTodolist,
        updateTask,
        updateTodolist,
    } = props;

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const changeFilterTasksHandler = (filter: Filter, todolistId: string) => {
        onChangeFilter(filter, todolistId)
    }

    const addTaskHandler = (title: string) => {
        addTask(title, todolistId)
    }

    const changeTitleTodolistHandler = (newTitle: string) => {
        updateTodolist(todolistId, newTitle)
    }

    return (
        <div>
            <div className="todolist-title-container">
                <h3>
                    <EditableSpan value={title} onChange={changeTitleTodolistHandler}/>
                </h3>
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </div>
            <AddItemForm addItem={addTaskHandler}/>
            {tasks.length === 0
                ? (
                    <p>No tasks</p>
                )
                : (
                    <ul>
                        {tasks.map(task => {
                            const removeTaskHandler = () => {
                                removeTask(task.id, todolistId)
                            }
                            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = event.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue, todolistId)
                            }
                            const changeTitleTaskHandler = (newTitle: string) => {
                                updateTask(todolistId, task.id, newTitle)
                            }
                                return (
                                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                        <EditableSpan value={task.title} onChange={changeTitleTaskHandler}/>
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
                    onClick={() => changeFilterTasksHandler('all', todolistId)}
                    className={filter === 'all' ? 'active-filter' : ''}
                />
                <Button
                    title={'Active'}
                    onClick={() => changeFilterTasksHandler('active', todolistId)}
                    className={filter === 'active' ? 'active-filter' : ''}
                />
                <Button
                    title={'Completed'}
                    onClick={() => changeFilterTasksHandler('completed', todolistId)}
                    className={filter === 'completed' ? 'active-filter' : ''}
                />
            </div>
            <div>{date}</div>
        </div>
    )
}