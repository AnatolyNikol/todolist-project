import Grid from "@mui/material/Grid2";
import {Paper} from "@mui/material";
import {Todolist} from "./Todolist/Todolsit";
import React from "react";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {todolitsSelectors} from "../../model/todolitsSelectors";

export const Todolists = () => {

    const todolists = useAppSelector(todolitsSelectors)

    return (
        todolists.map(todolist => {
                return (
                    <Grid key={todolist.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <Todolist key={todolist.id} todolist={todolist}/>
                        </Paper>
                    </Grid>
                )
            }
        )
    )
}