import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox'

type Props = {
    addItem: (title: string) => void

}

export const AddItemForm = (props: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null);

    const {addItem} = props;

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event:  KeyboardEvent<HTMLInputElement> ) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <div>
                <TextField
                    label='Enter a title'
                    variant={'outlined'}
                    className={error ? 'error' : ''}
                    value={title}
                    size={'small'}
                    error={!!error}
                    helperText={error}
                    onChange={changeTitleHandler}
                    onKeyUp={addItemOnKeyUpHandler}
                />
                <IconButton color='primary' onClick={addItemHandler}>
                    <AddBoxIcon/>
                </IconButton>
            </div>
        </div>

    )
}