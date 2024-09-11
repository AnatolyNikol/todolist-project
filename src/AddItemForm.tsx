import {Button} from "./Button";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={changeTitleHandler}
                    onKeyUp={addItemOnKeyUpHandler}
                />
                <Button title={'+'} onClick={addItemHandler}/>
            </div>
            {error && <span className='error-message'>{error}</span>}
        </div>

    )
}