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
            console.log(action.payload);
            const {
                count,
                next,
                previous,
                results
            } = action.payload

            state.count = count
            state.next = next
            state.previous = previous
            state.results = results

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
        },
        clearContent: ( state ) => {
            state.count = 0
            state.next = ''
            state.previous = ''
            state.results = []
        }
    }
})

export const { addContent, updateContent, clearContent } = contentSlice.actions
export default contentSlice.reducer