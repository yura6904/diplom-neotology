import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchRequest } from "./fetchRequest"

const initialState = {
    data: [],
    topSales: [],
    categories: [
        {
            id: 0,
            title: "Все"
        },
    ],
    searchStr: '',
    activeCategory: 0
}

//requests to the server
    
export const asyncGetIndexData = createAsyncThunk("asyncGetIndexData", async (categoryId=0) => {
    let response = await fetchRequest(`http://localhost:7070/api/items?categoryId=${categoryId}`)
    return await response
})
export const asyncGetTopSales = createAsyncThunk("asyncGetTopSales", async () => {
    let response = await fetchRequest('http://localhost:7070/api/top-sales')
    return await response
})
export const asyncGetMoreItems = createAsyncThunk("asyncGetMoreItems", async (params) => {
    let response = await fetchRequest(`http://localhost:7070/api/items?offset=${params.skipNum}&categoryId=${params.categoryId}`)
    return await response
})
export const asyncGetCategoryProd = createAsyncThunk("asyncGetCategoryProd", async (id) => {
    let response = await fetchRequest(`http://localhost:7070/api/items?categoryId=${id}`)
    return await response
})
export const asyncGetCategories = createAsyncThunk("asyncGetCategories", async () => {
    let response = await fetchRequest('http://localhost:7070/api/categories')
    return await response
})
export const asyncGetProductBySearch = createAsyncThunk("asyncGetProductBySearch", async (str) => {
    let response = fetchRequest(`http://localhost:7070/api/items?q=${str}`)
    return await response
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
        setSearchStr (state, action) {
            state.searchStr = action.payload
        },
        setActiveCategory (state, action) {
            state.activeCategory = action.payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(asyncGetIndexData.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(asyncGetTopSales.fulfilled, (state, action) => {
            state.topSales = action.payload
        })
        builder.addCase(asyncGetMoreItems.fulfilled, (state, action) => {
            let newData = state.data.concat(action.payload)
            return {
                ...state,
                data: newData
            }
            
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
        builder.addCase(asyncGetProductBySearch.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }

})

export const { setIndexData, setTopSales, setActiveCategory } = indexSlice.actions

export default indexSlice.reducer