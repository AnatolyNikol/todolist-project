import { v1 } from 'uuid';
import {
  TodolistType,
  todolistsReducer,
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
} from '../todolists-reducer';

let todolistID1: string;
let todolistID2: string;

let startState: TodolistType[] = [];

beforeEach(() => {
  todolistID1 = v1();
  todolistID2 = v1();

  startState = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ];
});

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistID1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistID2);
});

test('correct todolist should be added', () => {
  const newTitle = 'New Todolist';

  const endState = todolistsReducer(startState, addTodolistAC(newTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTitle);
});

test("correct todolist should change it's name", () => {
  const newTitle = 'New Title';

  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC({ todolistId: todolistID1, title: newTitle }),
  );

  expect(endState[0].title).toBe(newTitle);
  expect(endState[1].title).toBe('What to buy');
});

test('correct filter of todolist should be changed', () => {
  const newFilter = 'completed';

  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC({ todolistId: todolistID2, filter: newFilter }),
  );

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});
