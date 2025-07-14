import { createReducer } from "@reduxjs/toolkit";
import product_sale_actions from "../actions/productSale";

const { create_product_sale } =
    product_sale_actions;

const initial_state = {
    productSale: {},
    productsSales: [],
    messages: [],
};

const product_sale_reducer = createReducer(initial_state, (build) =>
    build
        .addCase(create_product_sale.fulfilled, (state, action) => {
            let new_state = {
                ...state,
                productSale: action.payload.productSale,
                messages: action.payload.messages,
            };
            return new_state;
        })

);

export default product_sale_reducer;