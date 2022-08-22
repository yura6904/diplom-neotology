import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import indexSlice from "./indexSlice";
import productSlice from "./productSlice";

const store = configureStore({
    reducer: {
        indexData: indexSlice,
        cartData: cartSlice,
        productData: productSlice
    }
})

export default store