import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    count: 0,
    next: '',
    previous: '',
    results: []
}

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        addContent: (state, action) => {
            return action.payload
        }
    }
})

export const { addContent } = contentSlice.actions
export default contentSlice.reducer