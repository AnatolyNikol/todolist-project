import {v1} from "uuid";
import {
    TodolistType,
    todolistsReducer,
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC, changeTodolistFilterAC
} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const newTitle = 'New Todolist'


    const endState = todolistsReducer(startState, addTodolistAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})

test('correct todolist should change it\'s name', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const newTitle = 'New Title'

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistID1, newTitle))

    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe('What to buy')
})

test('correct filter of todolist should be changed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const newFilter = 'completed'

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistID2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})