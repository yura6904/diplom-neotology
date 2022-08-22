import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    product: {},
}

//requests to the server
export const asyncGetProductById = createAsyncThunk("asyncGetProductById", async (id) => {
    let response = await fetch(`http://localhost:7070/api/items/${id}`)
    return await response.json()
})

const productSlice = createSlice({
    name: 'index',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncGetProductById.fulfilled, (state, action) => {
            state.product = action.payload
        })
    }
})

//export const {  } = productSlice.actions

export default productSlice.reducer