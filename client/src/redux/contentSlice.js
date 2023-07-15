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
        addContent: ( state, action ) => {
            return action.payload

        },
        updateContent: ( state, action ) => {
            const {
                count,
                next,
                previous,
                results
            } = action.payload

            const newMovies = results.filter((movie) => {
                return !state.results.some((existingMovie) => existingMovie.id === movie.id)
            })

            state.count = count
            state.next = next
            state.previous = previous
            state.results = state.results.concat(newMovies)

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