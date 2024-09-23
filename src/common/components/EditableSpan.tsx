import React, { ChangeEvent, useState } from 'react';
import { TextField } from '@mui/material';

type Props = {
  value: string;
  onChange: (newTitle: string) => void;
};

export const EditableSpan = (props: Props) => {
  const { value, onChange } = props;

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(value);

  const activateEditModeHandler = () => {
    setEditMode(true);
  };

  const deactivateEditModeHandler = () => {
    setEditMode(false);
  };

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    onChange(title);
  };

  return (
    <>
      {editMode ? (
        <TextField
          variant={'outlined'}
          size={'small'}
          value={title}
          autoFocus
          onBlur={deactivateEditModeHandler}
          onChange={changeTitleHandler}
        />
      ) : (
        <span onDoubleClick={activateEditModeHandler}>{value}</span>
      )}
    </>
  );
};
