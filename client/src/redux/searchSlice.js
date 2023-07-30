import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  search: '',
  searchResult: {
    count: 0,
    next: '',
    previous: '',
    results: []
  }

}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.search = action.payload
    },
    addSearchContent: ( state, action ) => {
      state.searchResult.count = action.payload.count
      state.searchResult.next = action.payload.next
      state.searchResult.previous = action.payload.previous
      state.searchResult.results = action.payload.results

    },
    updateSearchContent: ( state, action ) => {
      const {
        count,
        next,
        previous,
        results
      } = action.payload

      const newMovies = results.filter((movie) => {
        return !state.searchResult.results.some((existingMovie) => existingMovie.id === movie.id)
      })

      state.searchResult.count = count
      state.searchResult.next = next
      state.searchResult.previous = previous
      state.searchResult.results = state.results.concat(newMovies)

    },
    clearSearchContent: ( state ) => {
      state.search = ''
      state.searchResult.count = 0
      state.searchResult.next = ''
      state.searchResult.previous = ''
      state.searchResult.results = []
    }
  }
})

export const { 
  addSearch, 
  addSearchContent, 
  updateSearchContent, 
  clearSearchContent, 
  updateSearchContentCommons 
} = searchSlice.actions

export default searchSlice.reducer