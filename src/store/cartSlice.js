import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

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

//requests to the server
export const asyncFormOrder = createAsyncThunk("asyncFormOrder", async (order) => {
    let response = await fetch('http://localhost:7070/api/order', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }) 
    return await response.json()
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            return {
                ...state,
                cart: state.cart.concat(action.payload),
                cartCount: window.localStorage.length
            }
            //void(state.cart.push(action.payload)) //почему тут void решает проблему, я так и не понял
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

export const { addToCart, formOrder, deleteProdFromOrder } = cartSlice.actions

export default cartSlice.reducer