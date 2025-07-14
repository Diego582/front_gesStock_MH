import { createReducer } from "@reduxjs/toolkit";
import product_actions from "../actions/products";

const { read_products, read_product, create_product, destroy_product, update_product } =
  product_actions;

const initial_state = {
  product: {},
  products: [],
  messages: [],
};

const product_reducer = createReducer(initial_state, (build) =>
  build
    .addCase(read_products.fulfilled, (state, action) => {
      let new_state = {
        ...state,
        products: action.payload.products,
        messages: action.payload.messages,
      };
      return new_state;
    })
    .addCase(read_product.fulfilled, (state, action) => {
      let new_state = {
        ...state,
        product: action.payload.product,
        messages: action.payload.messages,
      };
      return new_state;
    })
    .addCase(create_product.fulfilled, (state, action) => {
      let new_state = {
        ...state,
        product: action.payload.product,
        products: action.payload.product
          ? [...state.products, action.payload.product]
          : [...state.products],
        messages: action.payload.messages,
      };
      return new_state;
    })
    .addCase(update_product.fulfilled, (state, action) => {

      let new_state = {
        ...state,
        product: action.payload.product,
        products: action.payload.product
          ? [...state.products.filter(
            (item) => item._id !== action.payload.product._id
          ), action.payload.product]
          : [...state.products],
        messages: action.payload.messages,
      };
      return new_state;
    })
    .addCase(destroy_product.fulfilled, (state, action) => {
      let new_state = {
        ...state,
        product: action.payload.product,
        products: [
          ...state.products.filter(
            (item) => item._id !== action.payload.product
          ),
        ],
        messages: action.payload.messages,
      };
      return new_state;
    })
);

export default product_reducer;
