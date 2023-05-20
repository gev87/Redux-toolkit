import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/modalSlice";


const url = 'https://course-api.com/react-useReducer-cart-project1';

export const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => {
    try {
        // console.log("name.",name,thunkAPI,thunkAPI.getState());
        thunkAPI.dispatch(openModal())
        const response = await axios(url);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || "Something went wrong")
    }
})
const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        },
        increaseItem: (state, { payload }) => {
            let item = state.cartItems.find(item => item.id === payload);
            ++item.amount;
        },
        decreaseItem: ({ cartItems }, { payload }) => {
            let item = cartItems.find(item => item.id === payload.id);
            --item.amount;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.price * amount;
            });
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: {
        [getCartItems.pending]: state => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]:(state, action) => {
            // console.log("action",action.payload)
            state.isLoading = false;
        }
    }
});

export const { clearCart, removeItem, increaseItem, decreaseItem, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
