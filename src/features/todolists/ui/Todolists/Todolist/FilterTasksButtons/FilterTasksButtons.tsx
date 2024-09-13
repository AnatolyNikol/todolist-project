
import {Box, Button} from "@mui/material";
import React from "react";
import {changeTodolistFilterAC, Filter, TodolistType} from "../../../../model/todolists-reducer";
import {filterButtonsContainerSx} from "./FilterTasksButtons.styles";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";

type Props = {
    todolist: TodolistType
}

export const FilterTasksButtons = (props: Props) => {
    const {todolist} = props;

    const dispatch = useAppDispatch()

    const changeFilterTasksHandler = (filter: Filter, todolistId: string) => {
        dispatch(changeTodolistFilterAC({filter: filter, id: todolistId}))
    }

    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                onClick={() => changeFilterTasksHandler('all', todolist.id)}
                color={'inherit'}
            >
                All
            </Button>
            <Button
                variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                onClick={() => changeFilterTasksHandler('active', todolist.id)}
                color={'primary'}
            >
                Active
            </Button>
            <Button
                variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                onClick={() => changeFilterTasksHandler('completed', todolist.id)}
                color={'secondary'}
            >
                Completed
            </Button>
        </Box>
    )
}