import { asyncThunkCreator , createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user : [],
    isLoading : false,
    error : null
}

export const getUser =createAsyncThunk('user/getUser', async (_,{rejectWithValue})=>{
    try {
        const response =await axios.get('https://mahacreed.shop/api/companies/getStates')
        return response.data
    } catch (error) {
        return rejectWithValue(error.message); // Reject with error message
  }
})

    export const userSlice = createSlice({
    name :"user",
    initialState,
    extraReducers:(builder)=>{
    builder.addCase(getUser.pending,(state)=>{
        state.isLoading = true
    })
    builder.addCase(getUser.fulfilled,(state, action)=>{
        state.isLoading = false
        state.user=action.payload
    })
    builder.addCase(getUser.rejected,(state, action)=>{
        state.isLoading = false
        state.error=action.payload
    })
    }
    })
export default userSlice.reducer
