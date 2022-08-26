import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [],
    topSales: [],
    categories: [
        {
            id: 10,
            title: "Все"
        },
    ]
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
export const asyncGetCategoryProd = createAsyncThunk("asyncGetCategoryProd", async (categoryId) => {
    let response = await fetch('http://localhost:7070/api/items', categoryId) 
    return await response.json()
})
export const asyncGetCategories = createAsyncThunk("asyncGetCategories", async (categoryId) => {
    let response = await fetch('http://localhost:7070/api/categories', categoryId) 
    return await response.json()
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
            state.data = action.payload
        })
        builder.addCase(asyncGetCategoryProd.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(asyncGetCategories.fulfilled, (state, action) => {
            if (state.categories.length === 1) {
                let c = state.categories.concat(action.payload)
                return {
                    ...state,
                    categories: c
                }
            }
            else {
                return {...state}
            }
            
        })
    }

})

export const { setIndexData, setTopSales } = indexSlice.actions

export default indexSlice.reducer