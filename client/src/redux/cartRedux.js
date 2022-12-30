import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: null,
        quantity: 0,
        total: 0,
    },
    reducers: {
        getAllProduct: (state, action) => {
            state.products = action.payload.product;
            state.total = action.payload.pricecart;
            state.quantity = action.payload.quanticart;
        },

        addProduct: (state, action) => {
            state.quantity = action.payload.total_quantity;
        },

        updatedProduct: (state, action) => {
            const tt = state.products.findIndex((item) => item._id === action.payload.id);
            state.products[tt].quantity = action.payload.update.quantiProduct;
            state.products[tt].price = action.payload.update.priceProduct;
            state.total = action.payload.update.totalpriceProduct;
            console.log(action.payload);
        },

        removeProduct: (state, action) => {
            state.quantity -= 1;
            const tt = state.products.findIndex((item) => item._id === action.payload);
            state.total -=
                state.products[tt].product_id.price * state.products[tt].quantity;
            state.products.splice(tt, 1);
        },
    },
});

export const { addProduct, removeProduct, getAllProduct, updatedProduct } =
    cartSlice.actions;

export default cartSlice.reducer;
