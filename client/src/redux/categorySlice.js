import {createSlice} from '@reduxjs/toolkit'

const initialState = []

export const categorySlice = createSlice({
    name: 'categorys',
    initialState,
    reducers: {
        addCategorys: (state, action) => {
            return action.payload
        }
    }
})

export const { addCategorys } = categorySlice.actions
export default categorySlice.reducer