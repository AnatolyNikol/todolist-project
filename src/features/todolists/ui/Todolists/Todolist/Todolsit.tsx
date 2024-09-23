import { AddItemForm } from '../../../../../common/components/AddItemForm';
import { TodolistType } from '../../model/todolists-reducer';
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons';
import { Tasks } from './Tasks/Tasks';
import { TodolistTitle } from './TodolistTitle/TodolistTitle';
import { addTaskAC } from '../../model/tasks-reducer';
import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch';

type Props = {
  todolist: TodolistType;
};

export const Todolist = (props: Props) => {
  const { todolist } = props;

  const dispatch = useAppDispatch();

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
