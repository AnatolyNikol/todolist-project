import {tasksReducer, TasksState} from "../tasks-reducer";
import {addTodolistAC, todolistsReducer, TodolistType} from "../todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksState = {}
    const startTodolistsState: TodolistType[] = []

    const action = addTodolistAC('New Title')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFormTasks = keys[0]
    const idFormTodolists = endTodolistsState[0].id

    expect(idFormTasks).toBe(action.payload.todolistId)
    expect(idFormTodolists).toBe(action.payload.todolistId)
})