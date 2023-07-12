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
        },
        updateContent: (state, action) => {
            const {
                count,
                next,
                previous,
                results
            } = action.payload

            state.count = count
            state.next = next
            state.previous = previous
            state.results.push(...results)
        }
    }
})

export const { addContent, updateContent } = contentSlice.actions
export default contentSlice.reducer