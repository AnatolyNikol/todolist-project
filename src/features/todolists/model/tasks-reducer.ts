import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {v1} from "uuid";

const initialState = {}

export const tasksReducer = (state: TasksState = initialState, {type, payload}: ActionsType) => {
    switch (type) {
        case 'REMOVE-TASK': {
            return {...state, [payload.todolistID]: state[payload.todolistID].filter(task => task.id !== payload.taskID)}
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: payload.title, isDone: false}
            return {...state, [payload.todolistID]: [...state[payload.todolistID], newTask]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [payload.todolistID]: state[payload.todolistID].map(task => task.id === payload.taskID
                    ? {...task, isDone: payload.isDone}
                    : task)}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [payload.todolistID]: state[payload.todolistID].map(task => task.id === payload.taskID
                    ? {...task, title: payload.title}
                    : task)}
        }
        case 'ADD-TODOLIST': {
            return {...state, [payload.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            delete state[payload.id]
            return state
        }
        default: {
            return state
        }
    }
}

//action creators

export const removeTaskAC = (payload: {todolistID: string, taskID: string}) => {
    return {type: 'REMOVE-TASK', payload: payload} as const
}

export const addTaskAC = (payload: {todolistID: string, title: string}) => {
    return {type: 'ADD-TASK', payload: payload} as const
}

export const changeTaskStatusAC = (payload: { todolistID: string, taskID: string, isDone: boolean}) => {
    return {type: 'CHANGE-TASK-STATUS', payload: payload} as const
}

export const changeTaskTitleAC = (payload: { todolistID: string, taskID: string, title: string}) => {
    return {type: 'CHANGE-TASK-TITLE', payload: payload} as const
}



//types

export type TasksState = {
    [key: string]: TaskType[]
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType