import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    search: '',
    count: 0,
    next: '',
    previous: '',
    results: []
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        addSearch: (state, action) => {
            state.search = action.payload
        },
        addSearchContent: ( state, action ) => {
            state.count = action.payload.count
            state.next = action.payload.next
            state.previous = action.payload.previous
            state.results = action.payload.results

        },
        updateSearchContent: ( state, action ) => {
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
        clearSearchContent: ( state ) => {
            state.search = ''
            state.count = 0
            state.next = ''
            state.previous = ''
            state.results = []
        }
    }
})

export const { addSearch, addSearchContent, updateSearchContent, clearSearchContent } = searchSlice.actions
export default searchSlice.reducer