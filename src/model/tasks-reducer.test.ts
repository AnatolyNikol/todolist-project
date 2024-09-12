import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, TasksState} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

let startState:TasksState = {};

beforeEach(() => {
    startState = {
        todolistID1: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        todolistID2: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: true},
        ]
    }
})

test('correct task should be deleted form correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC({todolistID: 'todolistID1', taskID: '2'}))

    expect(endState).toEqual({
        todolistID1: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        todolistID2: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: true},
        ]
    })
})

test('correct task should be added to correct array', () => {
    const endState = tasksReducer(startState, addTaskAC({todolistID: 'todolistID2', title: 'Jest'}))

    expect(endState['todolistID2'].length).toBe(3)
    expect(endState['todolistID1'].length).toBe(3)
    expect(endState['todolistID2'][0].id).toBeDefined()
    expect(endState['todolistID2'][2].title).toBe('Jest')
    expect(endState['todolistID2'][2].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC({
        todolistID: 'todolistID1',
        taskID: '3',
        isDone: true
    }))

    expect(endState['todolistID1'][2].isDone).toBe(true)
    expect(endState['todolistID1'][0].isDone).toBe(true)
})

test('correct task should be added to correct array', () => {
    const endState = tasksReducer(startState, addTaskAC({todolistID: 'todolistID2', title: 'Jest'}))

    expect(endState['todolistID2'].length).toBe(3)
    expect(endState['todolistID1'].length).toBe(3)
    expect(endState['todolistID2'][0].id).toBeDefined()
    expect(endState['todolistID2'][2].title).toBe('Jest')
    expect(endState['todolistID2'][2].isDone).toBe(false)
})

test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodolistAC('New Todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistID1' && k !== 'todolistID2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistID2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistID2']).not.toBeDefined()
})

