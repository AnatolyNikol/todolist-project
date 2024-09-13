import React from "react";
import {TodolistType} from "../../../../model/todolists-reducer";
import {Task} from "./Task/Task";
import {List} from "@mui/material";
import {useAppSelector} from "../../../../../../common/hooks/useAppSelector";
import {tasksSelectors} from "../../../../model/tasksSelectors";

type Props = {
    todolist: TodolistType
}

export const Tasks = (props: Props) => {
    const {todolist} = props;

    const tasks = useAppSelector(tasksSelectors)

    const allTodolistTasks = tasks[todolist.id]

    let tasksForTodolist = allTodolistTasks

    if (todolist.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {
                tasksForTodolist.length === 0
                    ? (
                        <p>No tasks</p>
                    )
                    : (
                        <List>
                            {tasksForTodolist.map(task => {
                                    return <Task todolist={todolist} task={task} key={task.id}/>
                                }
                            )}
                        </List>
                    )
            }
        </>
    )
}