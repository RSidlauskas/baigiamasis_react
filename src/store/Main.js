import {createSlice} from '@reduxjs/toolkit'

export const mainSlice = createSlice({
    name: "main",
    initialState: {
        value: 0
    },
    reducers: {
        incrementByAmount: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const {incrementByAmount} = mainSlice.actions
export default mainSlice.reducer