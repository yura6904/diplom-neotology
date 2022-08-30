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
/*const fetchRequest = async (url) => {
    let data = []
    let error = ''
    try {
        let response = await fetch('http://localhost:7070/api/top-sales')
        data = await response.json()
    } catch (e) {
        error = e
        let reload = window.confirm('Что-то пошло не так, перезагурзить страницу?')
        reload ? window.location.reload() : window.location.reload()
    }
     
    return data
}*/

    
// почему вызов функции fetchRequest ^^ не работает?
export const asyncGetIndexData = createAsyncThunk("asyncGetIndexData", async () => {
    let data = []
    let error = ''
    try {
        let response = await fetch('http://localhost:7070/api/items')
        data = await response.json()
    } catch (e) {
        error = e
        let reload = window.confirm('Что-то пошло не так, перезагурзить страницу?')
        reload ? window.location.reload() : window.close() //почему не работает window.close()
    }
     
    return await data
})
export const asyncGetTopSales = createAsyncThunk("asyncGetTopSales", async () => {
    let data = []
    let error = ''
    try {
        let response = await fetch('http://localhost:7070/api/top-sales')
        data = await response.json()
    } catch (e) {
        error = e
        let reload = window.confirm('Что-то пошло не так, перезагурзить страницу?')
        reload ? window.location.reload() : window.close()
    }
     
    return await data
})
export const asyncGetMoreItems = createAsyncThunk("asyncGetMoreItems", async (skipNum) => {
    let data = []
    let error = ''
    try {
        let response = await fetch(`http://localhost:7070/api/items?offset=${skipNum}`)
        data = await response.json()
    } catch (e) {
        error = e
        let reload = window.confirm('Что-то пошло не так, перезагурзить страницу?')
        reload ? window.location.reload() : window.close()
    }
     
    return await data
})
export const asyncGetCategoryProd = createAsyncThunk("asyncGetCategoryProd", async (id) => {
    let data = []
    let error = ''
    try {
        let response = await fetch(`http://localhost:7070/api/items?categoryId=${id}`)
        data = await response.json()
    } catch (e) {
        error = e
        let reload = window.confirm('Что-то пошло не так, перезагурзить страницу?')
        reload ? window.location.reload() : window.close()
    }
     
    return await data
})
export const asyncGetCategories = createAsyncThunk("asyncGetCategories", async () => {
    let data = []
    let error = ''
    try {
        let response = await fetch('http://localhost:7070/api/categories')
        data = await response.json()
    } catch (e) {
        error = e
        let reload = window.confirm('Что-то пошло не так, перезагурзить страницу?')
        reload ? window.location.reload() : window.close()
    }
     
    return await data
})
export const asyncFindProductByStr = createAsyncThunk("asyncFindProductByStr", async (id) => {
    //let response = await fetch(`http://localhost:7070/api/items/`)
    //return await response.json()
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
            console.log(action.payload)
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
        builder.addCase(asyncFindProductByStr.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }

})

export const { setIndexData, setTopSales } = indexSlice.actions

export default indexSlice.reducer