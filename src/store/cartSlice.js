import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
    order: []
}

//requests to the server
export const asyncFormOrder = createAsyncThunk("asyncFormOrder", async () => {
    //save to the local storage
    await console.log('ordering')

    //let response = await fetch('http://localhost:7070/api/items') 
    //return await response.json()
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => 
            void(state.cart.push(action.payload)), //почему тут void решает проблему, я так и не понял
        formOrder(state, action) {
            state.order = action.payload
        },
        deleteProdFromOrder(state, action) {
            void(state.cart.splice(action.payload, 1))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncFormOrder.fulfilled, (state, action) => {
            state.order = action.payload
        })
    }
})

export const { addToCart, formOrder, deleteProdFromOrder } = cartSlice.actions

export default cartSlice.reducer