import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from './categorySlice.js'
import contentReducer from './contentSlice.js'
import contentDetailReducer from './contentDetailSlice.js'
import searchSlice from './searchSlice.js'

export const store = configureStore({
    reducer: {
        categorys: categoryReducer,
        content: contentReducer,
        contentDetail: contentDetailReducer,
        search: searchSlice
    }
})