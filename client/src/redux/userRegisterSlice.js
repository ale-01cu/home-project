import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    username: '',
    password: '',
    rePassword: ''
}

export const userRegisterSlice = createSlice({
    name: 'userRegister',
    initialState,
    reducers: {
        addUserName: (state, action) => {
            state.username = action.payload
        },
        addPassword: (state, action) => {
            state.password = action.payload
        },
        addRePassword: (state, action) => {
            state.rePassword = action.payload
        },
        clearUserRegister: (state) => {
            state.username = ''
            state.password = ''
            state.rePassword = ''
        }
    }
})

export const { addUserName, addPassword, addRePassword, clearUserRegister } = userRegisterSlice.actions
export default userRegisterSlice.reducer