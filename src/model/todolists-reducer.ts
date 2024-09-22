import { v1 } from 'uuid';
import { Filter } from '../app/App';

const initialState: TodolistType[] = [];

export const todolistsReducer = (
  state: TodolistType[] = initialState,
  { type, payload }: ActionsType,
): TodolistType[] => {
  switch (type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(todolist => todolist.id !== payload.id);
    }
    case 'ADD-TODOLIST': {
      const newTodolist: TodolistType = {
        id: payload.todolistId,
        title: payload.title,
        filter: 'all',
      };
      return [...state, newTodolist];
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(todolist =>
        todolist.id === payload.todolistId
          ? { ...todolist, title: payload.title }
          : todolist,
      );
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(todolist =>
        todolist.id === payload.todolistId
          ? { ...todolist, filter: payload.filter }
          : todolist,
      );
    }
    default:
      return state;
  }
};

//action creators

export const removeTodolistAC = (todolistId: string) => {
  return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const;
};

export const addTodolistAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: { title: title, todolistId: v1() },
  } as const;
};

export const changeTodolistTitleAC = (payload: {
  todolistId: string;
  title: string;
}) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: payload,
  } as const;
};

export const changeTodolistFilterAC = (payload: {
  todolistId: string;
  filter: Filter;
}) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: payload,
  } as const;
};

//types

export type TodolistType = {
  id: string;
  title: string;
  filter: Filter;
};

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<
  typeof changeTodolistTitleAC
>;
export type ChangeTodolistFilterActionType = ReturnType<
  typeof changeTodolistFilterAC
>;

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;
