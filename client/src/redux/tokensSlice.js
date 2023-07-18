import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    access: '',
    refresh: ''
}

export const tokensSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        addTokens: (state, action) => {
            localStorage.setItem('tkaccess', action.payload.access)
            localStorage.setItem('tkrefresh', action.payload.refresh)
            return action.payload
        }
    }
})

export const { addTokens } = tokensSlice.actions
export default tokensSlice.reducer