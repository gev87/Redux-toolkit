import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
	cartItems,
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
        increaseItem:(state,{payload}) => {
            let item = state.cartItems.find(item => item.id === payload);
            ++item.amount;
        },
        decreaseItem: ({ cartItems },{ payload }) => {
            let item = cartItems.find(item => item.id === payload.id);
            --item.amount;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                console.log()
                amount += item.amount;
                total += item.price * amount;
            });
            state.amount = amount;
            state.total = total;

        }
	},
});

export const { clearCart, removeItem, increaseItem, decreaseItem, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
