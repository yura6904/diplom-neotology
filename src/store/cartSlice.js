import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

const initialState = []

//requests to the server
/*export const asyncGetIndexData = createAsyncThunk("asyncGetIndexData", async () => {
    let response = await fetch('http://localhost:7070/api/items') 
    return await response.json()
})*/

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => 
            void(state.push(action.payload)) //почему тут void решает проблему, я так и не понял
        
    }
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer