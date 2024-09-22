import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodolistType } from './model/todolists-reducer';
import { FilterTasksButtons } from './FilterTasksButtons';
import { Tasks } from './Tasks';

type Props = {
  todolist: TodolistType;
  date?: string;
  addTask: (title: string, todolistId: string) => void;
  removeTodolist: (todolistId: string) => void;
  updateTodolist: (todolistId: string, newTitle: string) => void;
};

export const Todolist = (props: Props) => {
  const { todolist, date, addTask, removeTodolist, updateTodolist } = props;

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id);
  };

  const addTaskHandler = (title: string) => {
    addTask(title, todolist.id);
  };

  const changeTitleTodolistHandler = (newTitle: string) => {
    updateTodolist(todolist.id, newTitle);
  };

  return (
    <div>
      <div className="todolist-title-container">
        <h3>
          <EditableSpan
            value={todolist.title}
            onChange={changeTitleTodolistHandler}
          />
        </h3>
        <IconButton title={'x'} onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
      <AddItemForm addItem={addTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
      <div>{date}</div>
    </div>
  );
};
