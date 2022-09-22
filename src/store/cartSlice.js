import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchRequest } from "./fetchRequest"

const initialState = {
    cart: [],
    order: { 
        owner: { 
            phone: '', 
            address: ''
        }, 
        items:[]
    },
    cartCount: 0
}

export const asyncFormOrder = createAsyncThunk("asyncFormOrder", async (order) => {
    await fetchRequest('http://localhost:7070/api/order', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }) 
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            return {
                ...state,
                cart: state.cart.concat(action.payload),
                cartCount: state.cart.length
            }
        },
        setNewCart: (state, action) => {
            return {
                ...state, 
                cart: action.payload
            }
            
        },
        formOrder(state, action) {
            state.order = action.payload
        },
        deleteProdFromOrder(state, action) {
            /*let newCart = current(state.cart)
            newCart.splice(action.payload, 1)
            return {
                ...state,
                cart: newCart
            }*/
            
            void(state.cart.splice(action.payload, 1))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncFormOrder.fulfilled, (state, action) => {
            state.order = action.payload
        })
    }
})

export const { addToCart, setNewCart, formOrder, deleteProdFromOrder } = cartSlice.actions

export default cartSlice.reducer