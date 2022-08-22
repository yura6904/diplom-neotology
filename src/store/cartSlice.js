import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: []
}

//requests to the server
/*export const asyncGetIndexData = createAsyncThunk("asyncGetIndexData", async () => {
    let response = await fetch('http://localhost:7070/api/items') 
    return await response.json()
})*/

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart(state, action) {
            state.cart.push(action.payload)
        }
    }
})

export const { setIndexData, setTopSales } = cartSlice.actions

export default cartSlice.reducer