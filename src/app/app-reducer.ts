const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appReducer = (state: InitialState = initialState, {type, payload}: ActionsType): InitialState => {
    switch (type) {
        case 'CHANGE-THEME': {
            return {...state, themeMode: payload.theme}
        }
        default: {
            return state
        }
    }
}

//action creators

export const changeThemeAC = (theme: ThemeMode) => {
    return {type: 'CHANGE-THEME', payload: {theme: theme}} as const
}

//types

export type ThemeMode = 'light' | 'dark'

type InitialState = typeof initialState

type ChangeThemeActionType = ReturnType<typeof changeThemeAC>

type ActionsType = ChangeThemeActionType