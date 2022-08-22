import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [],
    topSales: []
}

//requests to the server
export const asyncGetIndexData = createAsyncThunk("asyncGetIndexData", async () => {
    let response = await fetch('http://localhost:7070/api/items') 
    return await response.json()
})
export const asyncGetTopSales = createAsyncThunk("asyncGetTopSales", async () => {
    let response = await fetch('http://localhost:7070/api/top-sales') 
    return await response.json()
})
export const asyncGetMoreItems = createAsyncThunk("asyncGetMoreItems", async (skipNum) => {
    let response = await fetch(`http://localhost:7070/api/items?offset=${skipNum}`) 
    return await response.json() // почему приходит странный массив?
})

const indexSlice = createSlice({
    name: 'index',
    initialState: initialState,
    reducers: {
        setIndexData(state, action) {
            state.data = action.payload
        },
        setTopSales(state, action) {
            state.topSales = action.payload
        },
    },
    //getting data from api
    extraReducers: (builder) => {
        builder.addCase(asyncGetIndexData.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(asyncGetTopSales.fulfilled, (state, action) => {
            state.topSales = action.payload
        })
        builder.addCase(asyncGetMoreItems.fulfilled, (state, action) => {
            state.data.push(action.payload)
            console.log(state.data)
        })
    }

})

export const { setIndexData, setTopSales } = indexSlice.actions

export default indexSlice.reducer