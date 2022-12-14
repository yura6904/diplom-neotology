import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchRequest } from "./fetchRequest"

const initialState = {
    product: {}
}

export const asyncGetProductById = createAsyncThunk("asyncGetProductById", async (id) => {
    let response = await fetchRequest(`http://localhost:7070/api/items/${id}`)
    return response
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

export default productSlice.reducer