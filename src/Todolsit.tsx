import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodolistType } from './model/todolists-reducer';
import { FilterTasksButtons } from './FilterTasksButtons';
import { Tasks } from './Tasks';
import { TodolistTitle } from './TodolistTitle';

type Props = {
  todolist: TodolistType;
  date?: string;
  addTask: (title: string, todolistId: string) => void;
};

export const Todolist = (props: Props) => {
  const { todolist, date, addTask } = props;

  const addTaskHandler = (title: string) => {
    addTask(title, todolist.id);
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
      <div>{date}</div>
    </div>
  );
};
