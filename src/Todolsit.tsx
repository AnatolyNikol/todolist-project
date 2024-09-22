import { AddItemForm } from './AddItemForm';
import { TodolistType } from './model/todolists-reducer';
import { FilterTasksButtons } from './FilterTasksButtons';
import { Tasks } from './Tasks';
import { TodolistTitle } from './TodolistTitle';
import { addTaskAC } from './model/tasks-reducer';
import { useDispatch } from 'react-redux';

type Props = {
  todolist: TodolistType;
};

export const Todolist = (props: Props) => {
  const { todolist } = props;

  const dispatch = useDispatch();

  const addTaskHandler = (title: string) => {
    dispatch(addTaskAC({ todolistID: todolist.id, title: title }));
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
};
