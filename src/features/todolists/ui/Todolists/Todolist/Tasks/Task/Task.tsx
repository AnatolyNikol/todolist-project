import {Checkbox, IconButton, ListItem} from "@mui/material";
import React, {ChangeEvent} from "react";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../../../../../model/tasks-reducer";
import {TodolistType} from "../../../../../model/todolists-reducer";
import {getListItemSx} from "./Task.styles";
import {useAppDispatch} from "../../../../../../../common/hooks/useAppDispatch";

type Props = {
    todolist: TodolistType
    task: TaskType
}

export const Task = (props: Props) => {
    const {todolist, task} = props;

    const dispatch = useAppDispatch()

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const taskStatus = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistID: todolist.id, taskID: task.id, isDone: taskStatus}))
    }

    const changeTitleTaskHandler = (newTitle: string) => {
        dispatch(changeTaskTitleAC({todolistID: todolist.id, taskID: task.id, title: newTitle}))
    }

    const removeTaskHandler = () => {
        dispatch(removeTaskAC({todolistID:  todolist.id, taskID: task.id}))
    }


    return (
        <>
            <ListItem
                sx={getListItemSx(task.isDone)}
                key={task.id}
            >
                <div>
                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                    <EditableSpan value={task.title} onChange={changeTitleTaskHandler}/>
                </div>
                <IconButton title={'x'} onClick={removeTaskHandler}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
        </>
    )
}