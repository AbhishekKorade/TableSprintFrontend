import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Redux/fetures/productSlice'

export const store = configureStore ({
reducer:{
    user:userReducer
}
})