import React from "react";
import {AddItemForm} from "../../../../../common/components/AddItemForm";
import {TodolistType} from "../../../model/todolists-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "./Tasks/Tasks";
import {TodolistTitle} from "./TodolitsTitle/TodolistTitle";
import {addTaskAC} from "../../../model/tasks-reducer";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";

type Props = {
    todolist: TodolistType
}

export const Todolist = (props: Props) => {
    const dispatch = useAppDispatch()

    const {todolist} = props;

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC({todolistID: todolist.id, title: title}))
    }

    return (
        <>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskHandler}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist} />
        </>
    )
}