"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    category?: string;
}

export interface CartState {
    items: Record<number, CartItem>;
}

const initialState: CartState = {
    items: {},
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>) => {
            const { id, title, price, image, quantity = 1, category } = action.payload;
            const existing = state.items[id];
            if (existing) {
                existing.quantity += quantity;
            } else {
                state.items[id] = { id, title, price, image, quantity, category };
            }
        },
        removeItem: (state, action: PayloadAction<{ id: number }>) => {
            delete state.items[action.payload.id];
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const existing = state.items[id];
            if (existing) {
                existing.quantity = Math.max(1, quantity);
            }
        },
        clearCart: (state) => {
            state.items = {};
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


