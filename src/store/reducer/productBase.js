import { createReducer } from "@reduxjs/toolkit";
import productBase_actions from "../actions/productBase";

const { read_products_base } = productBase_actions;

const initial_state = {
  productBase: {},
  messages: [],
};

const productBase_reducer = createReducer(initial_state, (build) =>
  build.addCase(read_products_base.fulfilled, (state, action) => {
    let new_state = {
      ...state,
      productBase: action.payload.productBase,
      messages: action.payload.messages,
    };
    return new_state;
  })
);

export default productBase_reducer;
